export function formHTML(file_types = "", file_text = "", style_button = "") {
    return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>File Select</title>
            <meta name="author" content="santran686@gmail.com">
            <meta name="author" content="chainplatform.net">
            <style>
              * {
                    box-sizing: border-box;
              }
              body {
                    font-family: system-ui, sans-serif;
                    font-size: 14px;
                    -webkit-font-smoothing: antialiased;
                    margin: 0px;
                    width: 100%
              }
              button {
                    background: red;
                    border-width: 0px;
                    color: white;
                    padding: 8px 15px;
                    font-size: 13px;
                    cursor: pointer;
                    border-radius: 4px;
                    width: 100%;
              }
            </style>
            </head>
            <body>
                <button style='${style_button}' onclick="document.getElementById('file').click();">${file_text}</button>
                <form enctype="multipart/form-data" id="form_upload">
                    <input type='file' name="file" id="file" accept='${file_types}' style="display: none;" onchange="readURL(this)" />
                    <input type="hidden" id="language" name="language" value="">
                    <input type="hidden" id="os" name="os" value="">
                    <input type="hidden" id="version" name="version" value="">
                </form>
                <script>
                    function readURL(input) {
                        var url = input.value;
                        if (input.files && input.files[0]) {
                            var reader = new FileReader();
                            reader.onload = function (e) {
                                var url = input.value;
                                var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
                                var filename = input.files[0].name;
                                let result = { isFile: true, datas: { filename: filename, ext: ext, datas: e.target.result } };
                                (window.ReactNativeWebView || window.parent || window).postMessage(JSON.stringify(result), '*');
                            }
                            reader.readAsDataURL(input.files[0]);
                        }
                    }
                    async function sendData(infos) {
                        document.getElementById("os").value = infos.data.os;
                        document.getElementById("language").value = infos.data.language;
                        document.getElementById("version").value = infos.data.version;
                        const formData = new FormData(document.getElementById("form_upload"));
                        try {
                            let headers = { Authorization: 'Bearer ' + infos.data.token };
                            const response = await fetch(infos.data.api, {
                                method: infos.data.method,
                                body: formData,
                                headers: headers
                            });
                            let responseJson = await response.json();
                            let result = { uploadResult: "response", datas: responseJson };
                            (window.ReactNativeWebView || window.parent || window).postMessage(JSON.stringify(result), '*');
                            if (typeof responseJson.status != "undefined" && responseJson.status == 1) {
                                document.getElementById("form_upload").reset();
                                let result = { isFile: true, datas: null };
                                (window.ReactNativeWebView || window.parent || window).postMessage(JSON.stringify(result), '*');
                            }
                        } catch (e) {
                            let result = {uploadResult: "error", datas: e};
                            (window.ReactNativeWebView || window.parent || window).postMessage(JSON.stringify(result), '*');
                        }
                    }
                    window.addEventListener("message", function (events) {
                        let infos = events.data;
                        if (typeof events.data != "object") {
                            infos = JSON.parse(events.data);
                        }
                        if (infos.event == "uploadFile") {
                            sendData(infos);
                        }
                    });
                </script>
            </body>
        </html>`
}