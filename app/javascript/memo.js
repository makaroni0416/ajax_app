function memo() {
 const submit = document.getElementById("submit");
 submit.addEventListener("click", (e) => {
   const formData = new FormData(document.getElementById("form"));
   const XHR = new XMLHttpRequest();
   XHR.open("POST", "/posts", true);
   XHR.responseType = "json";
   XHR.send(formData);
   XHR.onload = () => {
     if (XHR.status != 200) {
       alert(`Error ${XHR.status}: ${XHR.statusText}`);
       return null;
     }
     const item = XHR.response.post;
     //レスポンスとして返却されたメモのレコードデータ取得
     const list = document.getElementById("list");
     //HTmLを描画する場所を指定する際に使用する「描画する親要素」
     const formText = document.getElementById("content");
     //メモの入力フォームを取得している
     const HTML = `
       <div class="post" data-id=${item.id}>
         <div class="post-date">
           投稿日時：${item.created_at}
         </div>
         <div class="post-content">
         ${item.content}
         </div>
       </div>`;
      //メモとして描画する部分のHTML
     list.insertAdjacentHTML("afterend", HTML);
     formText.value = "";
     //メモの入力フォームに入力されたままの文字のリセット
   };
   e.preventDefault();
   //標準設定されているイベントを阻止する
 });
}
window.addEventListener("load", memo);