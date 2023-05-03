import constants from '../constants/actionTypes'

let initialState = {
      blogposts: [],
      selectedBlogpost: null
}

const blogpostReducer = (state = initialState, action) => {
      let updated = Object.assign({}, state);

      switch(action.type) {
            case constants.FETCH_BLOGPOSTS:
                  updated['blogposts'] = action.blogposts;
                  updated['selectedBlogpost'] = action.blogposts[0];
                  return updated;
            case constants.SET_BLOGPOST:
                  updated['selectedBlogpost'] = action.selectedBlogpost;
                  return updated;
            case constants.FETCH_BLOGPOST:
                  updated['selectedBlogpost'] = action.selectedBlogpost;
                  return updated;
            default:
                  return state;
      }
}

export default blogpostReducer;