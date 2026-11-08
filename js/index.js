document.addEventListener("DOMContentLoaded", () => {
    const postsContainer = document.querySelector(".posts-feed");

    // بررسی وجود کانتینر برای جلوگیری از خطا در صفحات دیگر
    if (!postsContainer) return; 

    // خواندن فایل JSON با دستور fetch
    fetch("posts.json")
        .then(response => response.json())
        .then(posts => {
            // پاک کردن محتوای قبلی کانتینر
            postsContainer.innerHTML = ""; 

            // حلقه برای ایجاد هر پست
            posts.forEach(post => {
                const article = document.createElement("article");
                article.className = "post-card";
                
                // قالب HTML هر کارت پست (شامل آواتار و لینک پویا)
                article.innerHTML = `
                    <header class="post-header">
                        <img src="${post.avatar}" alt="آواتار پست" class="post-avatar">
                        <div>
                            <span class="post-category">${post.category}</span>
                            <time class="post-date">${post.date}</time>
                        </div>
                    </header>
                    <h2 class="post-title"><a href="post.html?id=${post.id}">${post.title}</a></h2>
// ...
<a href="post.html?id=${post.id}" class="read-more">مطالعه نوشتار »</a>
                    </div>
                `;
                
                // اضافه کردن کارت ساخته شده به کانتینر در صفحه
                postsContainer.appendChild(article);
            });
        })
        .catch(error => console.error("خطا در بارگذاری پست‌ها:", error));
});