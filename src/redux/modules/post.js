import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import { useDispatch } from "react-redux";

import moment from "moment";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const LOADING = "LOADING";

const setPost = createAction(SET_POST, (post_list, paging) => ({post_list, paging}));
const addPost = createAction(ADD_POST, (post) => ({post}));
const editPost = createAction(EDIT_POST, (post_id, post) => ({post_id, post}));
const loading = createAction(LOADING, (is_loading) => ({is_loading}));

const initialState = {
      list: [],
      paging: {start: null, next: null, size:2},
      is_loading: false,
}

// const initialPost = {
// 		user_id: 0,
//     user_name: "최기자",
//   title: '점점 사라지는 꽃, 이대로 괜찮은가?',
//   image_url: 'https://img1.daumcdn.net/thumb/R460x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fplanet%2Ffs7%2F16_22_22_34_2Aq7q_6660271_1_122.jpg&filename=122.jpg',
//   contents: "백합과의 여라해살이풀입니다. 학명은 Asparagus densiflorus 'Sprengerii'입니다. 남아프리카가 원산지이며 가지를 치면서 수 미터까지 자라는 덩굴성식물입니다. 봄에 연녹색의 꽃이 피고 가을에는 붉은 열매가 맺힙니다. 꽃말은 ‘변함 없는 마음’, ‘불변’이라고 하네요. 그래서 잎을 잘라 꽃장식에 많이 이용합니다.",
//   insert_dt: "2021-02-27 10:00:00",
//   like: 0,
// };
//!!!!!
const getPostFB = (start=null, size = 2) => {
  return function (dispatch, getState, {history}) {
    const postDB = firestore.collection('post');
    // dispatch(loading(true));
    let query = postDB.orderBy('insert_dt', 'desc');

    if(start){
      query.startAt(start);
    }

    query
    .get().then((docs) => {
      let post_list = [];

      let paging = {
        start: docs.docs[0],
        next: docs.docs.length === size+1? docs.docs[docs.docs.length -1] : null,
        size: size,
      }

      docs.forEach((doc) => {
        let _post = doc.data();
        _post.post_id = doc.id;
        post_list.push(_post);
      })

      post_list.pop();

      dispatch(setPost(post_list, paging));
    })
  }};

const addPostFB = (title, contents, url) => {
  if(title===''||contents===''||url===''){
    window.alert('제목, 내용, 사진을 모두 채워주세요!')
    return <div>뭘 넣어야할까!!</div>
  }

  return function (dispatch, getState, {history}) {
    const postDB = firestore.collection('post');
    const user = getState().user.user
    const totalinfo = {
        likeTF: false,
        like: 0,
        title: title,
        contents: contents,
        image_url: url,
        user_name: user.user_name,
        user_id: user.id,
        user_uid: user.uid,
        insert_dt: moment().format("YYYY-MM-DD hh:mm:ss") }
    
    postDB.add({...totalinfo}).then(() => {
      history.push('/')
    }).catch((err) => {
      console.log('post 작성 실패!', err);
    });
  dispatch(addPost(totalinfo));
  }
  
}



const deleteFB = (DC) => {
  
  const postDB = firestore.collection('post');
  console.log(postDB.doc())
  console.log()
postDB.doc(DC).delete().then(() => {
  console.log("Document successfully deleted!");
}).catch((error) => {
  console.error("Error removing document: ", error);
});
}

const editPostFB = () => {
  
}


export default handleActions(
    {
        [SET_POST]: (state, action) => produce(state, (draft) => {
          draft.list = action.payload.post_list;
          draft.paging = action.payload.paging;
          draft.is_loading = false;
        }),
  
        [ADD_POST]: (state, action) => produce(state, (draft) => {
          draft.list.unshift(action.payload.post);
        }),
        [EDIT_POST]: (state, action) =>
        produce(state, (draft) => {
        }),
        [LOADING]: (state, action) => {
          produce(state, (draft) => {
            draft.is_loading = action.payload.is_loading;
          })
        }
    },
    initialState
  );

  const actionCreators = {
    setPost,
    addPost,
    getPostFB,
    addPostFB,
    deleteFB,
  };
  
  export { actionCreators };