class ToolTip { }

class ProjectItem { 

    constructor(id){
        this.id = id;
        this.connectMoreInfoButton();
        this.connectSwitchButton();

    }

    connectMoreInfoButton(){}

    connectSwitchButton(){
        const projectItemElement = document.getElementById(this.id);
        const switchBtn = projectItemElement.querySelector('button:last-of-type');
        switchBtn.addEventListener('click',)
    }

}



class ProjectList {
    projects = [];
    constructor(type , switchHandlerFunction) {
        this.type =type;
        this.switchHandler = switchHandlerFunction;
        const prjItems = document.querySelectorAll(`#${type}-projects li`);

        for (const prjItem of prjItems) {
            this.projects.push(new ProjectItem(prjItem.id));
        }
    }

    addProject() { }

    switchProject(projectId) {
        /* const projectIndex = this.projects.indexOf(p => p.id === projectId);
        this.projects.splice(projectIndex, 1); */
        this.switchHandler(this.projects.find(p => p.id === projectId));
        this.projects.filter(p => p.id !== projectId);
    }
}



class App {
    init() {

        const activeProjectList = new ProjectList('active');
        const finshedProjectList = new ProjectList('finished');
    }
}
App.init();
