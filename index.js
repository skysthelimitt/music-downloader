document.addEventListener("DOMContentLoaded", async () => {
    let search = document.getElementById("search");
    document.getElementById("button").addEventListener("click", async () => {
        let query = search.value;
        let data = await (await fetch(`https://apis.deepjyoti30.dev/v2/ytmdl/search?q=${encodeURIComponent(query)}`)).json();
        document.getElementById("title").innerText = "Song"
        for(let i = 0;i<4;i++) {
            let songData = data[i];
            let element = document.createElement("div");
            element.className = "tile";
            element.id = i;
            let header = document.createElement("h1");
            header.innerText = songData["title"];
            let image = document.createElement("img");
            image.src = songData["cover"]["small"]
            element.appendChild(header);
            element.appendChild(image);
            document.getElementById("results-card").appendChild(element);
            element.addEventListener("click", async () => {
                document.getElementById("results-card").innerHTML = "";
                let postRequest = {"song": {"video_id":songData["id"]}}
                let data = await (await fetch(`https://apis.deepjyoti30.dev/v2/ytmdl/metadata?q=${encodeURIComponent(query)}`)).json();
                document.getElementById("title").innerText = "Metadata"
                for(let i = 0;i<4;i++) {
                    let songData = data[i];
                    let element = document.createElement("div");
                    element.className = "tile";
                    element.id = i;
                    let header = document.createElement("h1");
                    header.innerText = songData["name"];
                    let image = document.createElement("img");
                    image.src = songData["cover"]
                    element.appendChild(header);
                    element.appendChild(image);
                    document.getElementById("results-card").appendChild(element);
                    element.addEventListener("click", async () => {
                        postRequest["metadata"] = songData;
                        postRequest["song"]["format"] = "m4a";
                        let data = await (await fetch("https://apis.deepjyoti30.dev/v2/ytmdl/download", {method: "post",body: JSON.stringify(postRequest)})).json();
                        let link = document.createElement("a");
                        link.download = data["filename"].slice(0, -23) + ".m4a";
                        link.href = data["url"];
                        link.click();
                    })
                }
            })
        }
    })
})