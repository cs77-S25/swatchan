document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission
    
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    body = JSON.stringify({"title": title, "content": content});
    fetch('/new_thread', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: body
    })
    .then(response => response.json()) // Adjust based on expected response
    .then(data => {
        console.log("Success:", data);
        thread = data["thread"];
        let listgrp = document.getElementsByClassName("list-group")[0];
        let a = document.createElement("a");
        a.href = `/thread/${thread["id"]}`;
        a.className = "list-group-item";
        let h = document.createElement("h5");
        h.appendChild(document.createTextNode(thread["title"]));
        let p = document.createElement("p");
        p.appendChild(document.createTextNode(thread["content"]));
        a.appendChild(h);
        a.appendChild(p);
        listgrp.prepend(a);
    })
    .catch(error => {
        console.error("Error:", error);
    });
});
