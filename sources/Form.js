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
                <button style='${style_button}' onclick="document.getElementById('upload').click();">${file_text}</button>
                <input type='file' id="upload" accept='${file_types}' style="display: none;" onchange="readURL(this)" />
                <script>
                    function readURL(input) {
                        var url = input.value;
                        if (input.files && input.files[0]) {
                            var reader = new FileReader();
                            reader.readAsDataURL(input.files[0]);
                            reader.onload = function (e) {
                                var url = input.value;
                                var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
                                var filename = input.files[0].name;
                                let result = {filename: filename, isFile: true, ext: ext, datas: e.target.result};
                                (window.ReactNativeWebView || window.parent || window).postMessage(JSON.stringify(result), '*');
                            }
                        }
                    }
                </script>
            </body>
        </html>`
}