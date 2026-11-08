document.addEventListener("DOMContentLoaded", () => {
    const postContainer = document.getElementById("single-post-container");
    if (!postContainer) return;

    // خواندن ID پست از URL (مثلاً post.html?id=1)
    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get("id"));

    if (!postId) {
        postContainer.innerHTML = "<p>یادداشتی یافت نشد. به صفحه اصلی بازگردید.</p>";
        return;
    }

    // دریافت اطلاعات از دیتابیس فرضی ما
    fetch("posts.json")
        .then(response => response.json())
        .then(posts => {
            // پیدا کردن پست مورد نظر بر اساس ID
            const post = posts.find(p => p.id === postId);

            if (post) {
                // تزریق محتوای پست به همراه عکس کاور و استایل Fade-in
                postContainer.innerHTML = `
                    <div class="cover-image-wrapper" style="animation: fadeIn 1.5s ease;">
                        <img src="${post.coverImage}" alt="${post.title}" style="width:100%; border-radius:10px; max-height:400px; object-fit:cover;">
                    </div>
                    <header style="margin-top: 1.5rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 1rem;">
                        <span class="post-category" style="background:#f1f5f9; color:#0f766e; padding:4px 8px; border-radius:6px; font-size:0.85rem;">${post.category}</span>
                        <time style="color:#64748b; font-size:0.85rem; margin-right:1rem;">${post.date}</time>
                        <h1 style="color:#0f766e; margin-top:1rem; font-size: 1.8rem;">${post.title}</h1>
                    </header>
                    <div class="post-content" style="margin-top: 1.5rem; line-height: 2;">
                        ${post.content}
                    </div>
                `;
            } else {
                postContainer.innerHTML = "<p> گوید که : یافت می نشود جسته ایم ما ): </p>";
            }
        })
        .catch(error => console.error("خطا:", error));
});

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("single-post-container");
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const postId = parseInt(urlParams.get("id")) || 1;

  fetch("posts.json")
    .then(res => res.json())
    .then(posts => {
      const post = posts.find(p => p.id === postId);
      if (!post) {
        container.innerHTML = "<p>یادداشت مورد نظر یافت نشد.</p>";
        return;
      }

      document.title = `${post.title} – HEDABETA`;

      container.innerHTML = `
        <img src="${post.coverImage}" alt="${post.title}" class="post-cover-image">
        <div class="post-header">
          <span class="post-category">${post.category}</span>
          <time class="post-date">${post.date}</time>
        </div>
        <h1 class="post-full-title">${post.title}</h1>
        <div class="post-full-content">
          ${post.content}
        </div>
      `;
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = "<p>خطا در بارگذاری یادداشت.</p>";
    });
});

// ارسال تعاملی نظر در فرانت‌اِند
function submitComment() {
  const authorInput = document.getElementById("comment-author");
  const textInput = document.getElementById("comment-text");
  const list = document.getElementById("comments-list");

  if (!authorInput.value.trim() || !textInput.value.trim()) return;

  const newComment = document.createElement("div");
  newComment.className = "comment-item";
  newComment.innerHTML = `
    <div class="comment-header">
      <span class="comment-author">${authorInput.value}</span>
      <time class="comment-date">لحظاتی پیش</time>
    </div>
    <p class="comment-body">${textInput.value}</p>
  `;

  list.prepend(newComment);
  textInput.value = "";
  authorInput.value = "";
}