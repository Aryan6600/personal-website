document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }
});
const blogsGrid = document.getElementById('blogs-grid')
const loadMoreBtn = document.getElementById("loadMoreBtn")

let page=1
async function loadMore(){
    const req = await fetch(`/api/blogs?n=${page+1}`)
    const res = await req.json()
    if (res.length==0){
        loadMoreBtn.remove()
        return
    }
    page++
    console.log(res)
    res.forEach(blog => {
        const blogitem = document.createElement('div')
        blogitem.classList.add('blog')
        blogitem.setAttribute('style',`background-image: url('${blog.image}')`)
        blogsGrid.appendChild(blogitem)
        blogitem.innerHTML=`<div class="text-wrapper">
                            <h2 class="section-title">${blog.title}</h2>
                        </div>`
        blogsGrid.appendChild(blogitem)
    });
}

loadMoreBtn.addEventListener('click',loadMore)

