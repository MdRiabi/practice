class DOMHelper {

    static clearEventListeners(element) {
        const clonedElement = element.cloneNode(true);
        element.replaceWith(clonedElement);
        return clonedElement;
    }


    static moveElement(elemntId, newDestinationSelector) {

        const elemnt = document.getElementById(elemntId);
        const destinationElement = document.querySelector(newDestinationSelector);
        destinationElement.append(elemnt);

    }
}




class ToolTip { }

class ProjectItem {

    constructor(id, updateProjectListsFunction , type) {
        this.id = id;
        this.updateProjectListsHandler = updateProjectListsFunction;
        this.connectMoreInfoButton();
        this.connectSwitchButton(type);

    }

    connectMoreInfoButton() { }

    connectSwitchButton(type) {
        const projectItemElement = document.getElementById(this.id);
        let  switchBtn = projectItemElement.querySelector('button:last-of-type');
        switchBtn = DOMHelper.clearEventListeners(switchBtn);
        switchBtn.textContent = type === 'active' ? 'Finish' : 'Activated';
        switchBtn.addEventListener(
            'click', 
             this.updateProjectListsHandler.bind(null , this.id))
    }

    update(updateProjectListFn , type){
        this.updateProjectListsHandler = updateProjectListFn;
        this.connectSwitchButton(type);

    }

}



class ProjectList {
    projects = [];
    constructor(type) {
        this.type = type;
        const prjItems = document.querySelectorAll(`#${type}-projects li`);

        for (const prjItem of prjItems) {
            this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type));
        }
    }

    setSwitchHandlerFunction(switchHandlerFunction) {
        this.switchHandler = switchHandlerFunction;

    }
    addProject(project) {
        //console.log(this)
        this.projects.push(project);
        DOMHelper.moveElement(project.id , `#${this.type}-projects ul`);
        project.update(this.switchProject.bind(this));

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
