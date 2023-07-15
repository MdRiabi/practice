class ToolTip { }

class ProjectItem { 

    constructor(id , updateProjectListsFunction){
        this.id = id;
        this.updateProjectListsHandler = updateProjectListsFunction; 
        this.connectMoreInfoButton();
        this.connectSwitchButton();

    }

    connectMoreInfoButton(){}

    connectSwitchButton(){
        const projectItemElement = document.getElementById(this.id);
        const switchBtn = projectItemElement.querySelector('button:last-of-type');
        switchBtn.addEventListener('click', this.updateProjectListsHandler)
    }

}



class ProjectList {
    projects = [];
    constructor(type) {
        this.type =type;
        const prjItems = document.querySelectorAll(`#${type}-projects li`);

        for (const prjItem of prjItems) {
            this.projects.push(new ProjectItem(prjItem.id , this.switchProject.bind(this)));
        }
    }

    setSwitchHandlerFunction(switchHandlerFunction) {
        this.switchHandler = switchHandlerFunction;

    }
    addProject() {
        console.log(this)
     }

    switchProject(projectId) {
        /* const projectIndex = this.projects.indexOf(p => p.id === projectId);
        this.projects.splice(projectIndex, 1); */
        this.switchHandler(this.projects.find(p => p.id === projectId));
        this.projects.filter(p => p.id !== projectId);
    }
}



class App {
   static init() {

        const activeProjectList = new ProjectList('active');
        const finshedProjectList = new ProjectList('finished');
        activeProjectList.setSwitchHandlerFunction(finshedProjectList.addProject.bind(finshedProjectList));
        finshedProjectList.setSwitchHandlerFunction(activeProjectList.addProject.bind(activeProjectList));

    }

}
App.init();
