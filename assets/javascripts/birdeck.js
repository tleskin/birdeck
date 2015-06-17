$(document).ready(function(){
  fetchPosts()
  createPost()
  fetchPostsButton()
})


function renderPost(postInfo) {
  $("#latest-posts").append("" +
  "<div class='post' data-id=" +
  postInfo.id +
  "><h6>Published on " +
  postInfo.created_at +
  "</h6><p>" +
  postInfo.description +
  "</p></div>")
}

function fetchPosts(){
  $.ajax({
    type: 'GET',
    url: 'https://turing-birdie.herokuapp.com/api/v1/posts.json',
    success: function(posts) {
      $.each(posts, function(index, post){
        var newestPostID = parseInt($('.post').last().attr('data-id'))
        if ( isNaN(newestPostID) || post.id > newestPostID) {
          renderPost(post)
        }
      })
    }
  })
}

function createPost(){
  $("#create-post").on('click', function(){
    var postParams = { post: { description: $("#post-description").val() }}

    $.ajax({
      type: 'POST',
      url: 'https://turing-birdie.herokuapp.com/api/v1/posts.json',
      data: postParams,
      success: function(newPost){
        renderPost(newPost)
      }
    })
  })
}

function fetchPostsButton(){
  $("#button-fetch").on("click", function(){
    fetchPosts()
  })
}
