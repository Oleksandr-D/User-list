const getS = (selector: any) => document.querySelector(selector);
//create user, button "add user"
let arr:Array<any> = [];
//button add user
function addUser() {
    let obj = {
      login:getS('#login').value,
      pass:getS('#password').value,
      mail:getS('#email').value,
      delBtn:`<input type="button" value="Delete" class="delete" onclick="deleteUser()">`,
      editBtn:`<input type="button" value="Edit" class="edit" onclick="edit()">`
    };
    arr.push(obj);
    //clear fields
    getS('.form').reset();
    check();
    render();
}
//create table, user list
function render() {
    event.preventDefault();
    //clear fields. remove tbody
    getS('#list').remove()
    //filling tables. create tbody
    const tBody:HTMLTableSectionElement = document.createElement('tbody');
    tBody.setAttribute('id', 'list');
    getS('.tHed').after(tBody);
    arr.forEach((user, index) => {
        const row:HTMLTableRowElement = document.createElement('tr');
        const td1:HTMLTableCellElement = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');
        const td5 = document.createElement('td');
        const td6 = document.createElement('td');
        td1.innerHTML = `${index + 1}`;
        td2.innerHTML = user.login;
        td3.innerHTML = user.pass;
        td4.innerHTML = user.mail;
        td5.innerHTML = user.editBtn;
        td6.innerHTML = user.delBtn;
        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);
        row.appendChild(td4);
        row.appendChild(td5);
        row.appendChild(td6);
        getS('#list').appendChild(row);
    });
}
// button delete
function deleteUser() {
    let userIndex:any = (event.target as HTMLElement).parentNode.parentNode; // tbody
    let deleteIndex = userIndex.children[0].innerHTML;
    arr.splice(deleteIndex - 1, 1); //deleted the element that was clicked and all 0 indexes.
    userIndex.parentElement.removeChild(userIndex); //delete tr
    render();
}
//button edit
function edit() {
    getS('.addUser').classList.add('hide');
    getS('.editUser').classList.remove('hide');
    let userIndx = (event.target as HTMLElement).parentNode.parentNode;
    getS('#login').value += userIndx.children[1].innerHTML;
    getS('#password').value += userIndx.children[2].innerHTML;
    getS('#email').value += userIndx.children[3].innerHTML;
    let deleteIndex:any = userIndx.children[0].innerHTML;
    arr.splice(deleteIndex - 1, 1);
};
//button editUser
function editUser() {
    getS('.editUser').classList.add('hide');
    getS('.addUser').classList.remove('hide');
    render();
    addUser();
}
//// field validation
let loginRegExp:RegExp = /^[a-zA-Z]{4,16}$/;
let emailRegExp:RegExp = /^[a-zA-Z0-9_.&#]+[^\s@]+@[^\s@]+[.][^\s@\W]{1,3}$/;
let passRegExp:RegExp = /^[a-zA-Z0-9]{4,16}$/;

function check() {
    const log = getS('#login');
    const pass = getS('#password');
    const em = getS('#email');
    if (log.validity.valid && pass.validity.valid && em.validity.valid) {
        getS('.addUser').disabled = false;
        getS('.editUser').disabled = false;
    } else {
        getS('.addUser').disabled = true;
        getS('.editUser').disabled = true;
    }
};