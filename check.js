const fs=require('fs');
const appJs=fs.readFileSync('app.js','utf8');
const indexHtml=fs.readFileSync('index.html','utf8');

const vars = ['canvas','navLoginBtn','navUserBadge','dropdownMypageBtn','dropdownLogoutBtn',
'loginModalBackdrop','loginModalClose','loginSubmitBtn','loginPwInput','loginIdInput',
'profileModalBackdrop','profileModalClose','profileBtnAdd','profileBtnDelete','profileInput',
'authorInput','lightboxClose','libModalBackdrop','libModalClose','libModalCopy','libModalEdit',
'libModalCancel','libModalSave','libModalEditTextareaEn','mobileMenuOverlay','navFloat',
'navLibrary','filterNewest','filterOldest','textarea','submitBtn','toggleListBtn'];

vars.forEach(v=>{
    const m = appJs.match(new RegExp('(?:const|let|var)\\s+'+v+'\\s*=\\s*document\\.getElementById\\([\\\'\\"](.*?)[\\\'\\"]\\)'));
    if(m) {
        const id=m[1];
        if(!indexHtml.includes('id=\"'+id+'\"') && !indexHtml.includes("id='"+id+"'")) {
            console.log('Missing in index.html: ' + id + ' (var: ' + v + ')');
        }
    }
});
