var qualification_list = [];
var project_list = [];

var form = document.getElementById("main-form");
var ids = 1;

document.querySelectorAll("input, textarea").forEach((element)=> {
    element.addEventListener("input", ()=>{
        element.classList.remove("is-invalid");
    })
})

function addQual() {
    var degree = document.getElementById("user-degree");
    var stream = document.getElementById("user-stream");
    var start = document.getElementById("user-start-year");
    var end = document.getElementById("user-end-year");
    if(validateQualList(degree, stream, start, end)) { 
        var qual = {
            deg: degree.value.trim(),
            str: stream.value.trim(),
            st: start.value.trim(),
            en: end.value.trim(),
            id: ids
        }
        qualification_list.push(qual);
        ids++;
        renderQualList();
        degree.value = "";
        stream.value = "";
        start.value = ""; 
        end.value = "";
    }
}

function validateQualList(degree, stream, start, end) {
    var isValid = true;
    if(degree.value.trim() === "" || stream.value.trim() === "" || start.value.trim() === "" || end.value.trim() === "") {
        isValid = false;
        if(degree.value.trim() === "") {
            degree.classList.add("is-invalid");
            degree.value = "";
        }
        if(stream.value.trim() === ""){
            stream.classList.add("is-invalid");
            stream.value = "";
        }
        if(start.value.trim() === "") {
            start.classList.add("is-invalid");
            start.value = "";
        }
        if(end.value.trim() === "") {
            end.classList.add("is-invalid");
            end.value = "";
        }
    }
    return isValid;
}

function renderQualList() {
    //console.log(qualification_list);
    var parent = document.getElementById("qualification-list");
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    qualification_list.forEach((element)=>{
        var list_item = document.createElement("li");
        var degree = element.deg;
        var stream = element.str;
        var start = element.st;
        var end = element.en;
        var id = element.id;
        var qual_string = degree + " in " + stream + " from " + start + "-" + end;
        var editButton = document.createElement("button");
        editButton.innerText = "edit";
        editButton.classList.add("mx-1");
        editButton.addEventListener("click", ()=> {
            editQualItem(id);
        })
        var deleteButton = document.createElement("button");
        deleteButton.innerText = "delete";
        deleteButton.classList.add("mx-1");
        deleteButton.addEventListener("click", ()=> {
            deleteQualItem(id);
        })
        list_item.appendChild(document.createTextNode(qual_string));
        list_item.appendChild(editButton);
        list_item.appendChild(deleteButton);
        list_item.classList.add("list-group-item");
        parent.appendChild(list_item);
    })
}

function deleteQualItem(index) {
    var i = 0;
    while(i < qualification_list.length) {
        if(qualification_list[i].id === index) {
            qualification_list.splice(i, 1);
        } else {
            i++;
        }
    }
    renderQualList();
}

function editQualItem(index) {
    for(var i = 0; i < qualification_list.length; i++) {
        if(qualification_list[i].id === index) {
            document.getElementById("user-degree").value = qualification_list[i].deg;
            document.getElementById("user-stream").value = qualification_list[i].str;
            document.getElementById("user-start-year").value = qualification_list[i].st;
            document.getElementById("user-end-year").value = qualification_list[i].en;
            break;
        }
    }
    deleteQualItem(index);
    renderQualList();
}

function addProj() {
    var title = document.getElementById("user-project-name");
    var desc = document.getElementById("user-project-desc");
    var skills = document.getElementById("user-project-skills");
    if(validateProjList(title, desc, skills)) {
        var proj = {
            title: title.value.trim(),
            description: desc.value.trim(),
            skills: skills.value.trim(),
            id: ids
        }
        project_list.push(proj);
        ids++;
        renderProjList();
        title.value = "";
        desc.value = "";
        skills.value = "";
    }
}

function validateProjList(title, desc, skills) {
    var isValid = true;
    if(title.value.trim() === "" || desc.value.trim() === "" || skills.value.trim() === "") {
        isValid = false;
        if(title.value.trim() === "") {
            title.classList.add("is-invalid");
            title.value = "";
        }
        if(desc.value.trim() === ""){
            desc.classList.add("is-invalid");
            desc.value = "";
        }
        if(skills.value.trim() === "") {
            skills.classList.add("is-invalid");
            skills.value = "";
        }
    }
    return isValid;
}

function renderProjList() {
    var parent = document.getElementById("project-list");
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    project_list.forEach((element)=>{
        var list_item = document.createElement("li");
        var title = element.title;
        var desc = element.description;
        var id = element.id;
        var proj_string = title + ": " + desc + ". ";
        var editLink = document.createElement("a");
        editLink.innerText = "edit";
        editLink.classList.add("mx-1");
        editLink.addEventListener("click", ()=> {
            editProjItem(id);
        })
        var deleteLink = document.createElement("a");
        deleteLink.innerText = "delete";
        deleteLink.classList.add("mx-1");
        deleteLink.addEventListener("click", ()=> {
            deleteProjItem(id);
        })
        list_item.appendChild(document.createTextNode(proj_string));
        list_item.appendChild(editLink);
        list_item.appendChild(deleteLink);
        list_item.classList.add("list-group-item");
        parent.appendChild(list_item);
    })
}

function deleteProjItem(index) {
    var i = 0;
    while(i < project_list.length) {
        if(project_list[i].id === index) {
            project_list.splice(i, 1);
        } else {
            i++;
        }
    }
    renderProjList();
}

function editProjItem(index) {
    for(var i = 0; i < project_list.length; i++) {
        if(project_list[i].id === index) {
            document.getElementById("user-project-name").value = project_list[i].title;
            document.getElementById("user-project-desc").value = project_list[i].description;
            document.getElementById("user-project-skills").value = project_list[i].skills;
            break;
        }
    }
    deleteProjItem(index);
    renderProjList();
}

function checkForm() {
    var name = document.getElementById("user-name");
    var mail = document.getElementById("user-mail");
    var phone = document.getElementById("user-phone");
    var qual_list = document.getElementById("qualification-list");
    var proj_list = document.getElementById("project-list");
    if(name.value.trim() === "" || mail.value.trim() === "" || phone.value.trim() === "" || qual_list.firstChild === null || proj_list.firstChild === null) {
        if(name.value.trim() === "" ) {
            name.classList.add("is-invalid");
            name.value = "";
        } 
        if(mail.value.trim() === "") {
            mail.classList.add("is-invalid");
            mail.value = "";
        }
        if(phone.value.trim() === "") {
            phone.classList.add("is-invalid");
            phone.value = "";
        }
        if(qual_list.firstChild === null) {
            if(validateQualList(document.getElementById("user-degree"), document.getElementById("user-stream"), document.getElementById("user-start-year"), document.getElementById("user-end-year"))) {
                alert("Please click 'add entry'");
            }
        }
        if(proj_list.firstChild === null) {
            if(validateProjList(document.getElementById("user-project-name"), document.getElementById("user-project-desc"), document.getElementById("user-project-skills"))) {
                alert("Please click 'add entry'");
            }
        }
    } else {
        var form = document.getElementById("form-div");
        while(form.firstChild) {
            form.removeChild(form.firstChild)
        }
        document.getElementById("name").innerText = name.value.trim();
        document.getElementById("mailid").href = "mailto:" + mail.value.trim();
        document.getElementById("mailid").innerText = mail.value.trim();
        document.getElementById("phone").innerText = phone.value.trim();
        var projList = document.getElementById("projects");
        project_list.forEach((element)=> {
            var listNode = document.createElement("li");
            var title = element.title;
            var desc = element.description;
            var proj_string = title + ": " + desc + ". ";
            listNode.appendChild(document.createTextNode(proj_string));
            projList.appendChild(listNode);
        })
        var qualList = document.getElementById("qualifications");
        qualification_list.forEach((element)=> {
            var listNode = document.createElement("li");
            var degree = element.deg;
            var stream = element.str;
            var start = element.st;
            var end = element.en;
            var qual_string = degree + " in " + stream + " from " + start + "-" + end;
            listNode.appendChild(document.createTextNode(qual_string));
            qualList.appendChild(listNode);
        })
        document.getElementById("resume-div").style.display = "block";
    }
}