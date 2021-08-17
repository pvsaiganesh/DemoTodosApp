import {Component} from 'react'
import ListItem from '../ListItem'
import './index.css'
import 'antd/dist/antd.css';
import {Button} from 'antd'

class TodoList extends Component{
    state={listItems:[],taskName:'',editedTaskName:'',editId:null,showInputs:false,editView:false,id:1}


    editListItemExternal=(id)=>{
        this.setState({editView:true,editId:id})
    }

    deleteListItemExternal=(id)=>{
        const {listItems}=this.state
        const filteredListItems=listItems.filter(item=>item.id!==id)
        this.setState({listItems:filteredListItems})
    }

    renderTable=()=>{
    const {listItems}=this.state 
    return <table>
        <thead>
            <tr className="table-headings">
                <td width="10%" className="table-heading">#</td>
                <td width="50%" className="table-heading">Task Name</td>
                <td width="20%" className="table-heading">Status</td>
                <td width="10%" className="table-heading">Edit</td>
                <td width="10%" className="table-heading">Remove</td>
            </tr>
        </thead>
        <tbody>
        {listItems.map(item=><ListItem deleteListItemExternal={this.deleteListItemExternal} editListItemExternal={this.editListItemExternal} key={item.id} item={item}/>)}
        </tbody>
    </table>
    }

    setInputView=()=>{
        const {showInputs}=this.state
        if(showInputs===false){
            this.setState({showInputs:true})
        }
    }

    getTaskName=(e)=>{this.setState({taskName:e.target.value})}

    addToListItems=(e)=>{
        e.preventDefault();
        const {taskName,id}=this.state
        const obj={id,taskName}
        if(taskName!==''){
        this.setState(prevState=>({listItems:[...prevState.listItems,obj],taskName:'',showInputs:false,id:prevState.id+1}))
        }
    }



    getEditedTaskName=(e)=>{
        this.setState({editedTaskName:e.target.value})
    }
    
    renderInputView=()=>{
        const {taskName}=this.state
        return <form onSubmit={this.addToListItems} className="input-view">
            <div>
            <h1 className="heading">Add Task Name</h1>
            <input className="input-box" type="text" value={taskName} onChange={this.getTaskName}/>
            </div>
            <button id="button" type="submit" ></button>
            </form>
    }

    editInListItems=(e)=>{
        e.preventDefault()
        const {listItems,editId,editedTaskName}=this.state
        const editedNewListItems=listItems.map(item=>{
            if(item.id===editId){
                return {id:item.id,taskName:editedTaskName}
            }
            return item
        })
        this.setState({listItems:editedNewListItems,editView:false,editedTaskName:''})
    
    }

    render(){
        const {showInputs,editView}=this.state
        const {editedTaskName}=this.state  
        return <div>
            <h1 className="heading">TODO List Demo App</h1>
            <span className="sub-heading">Do it now.</span>
            {editView?<form onSubmit={this.editInListItems} className="input-view">
                <div>
                <h1 className="heading">Edit Task Name</h1>
                <input className="input-box" type="text" value={editedTaskName} onChange={this.getEditedTaskName}/>
                </div>
                <button id="button" type="submit" ></button>
                </form>:<div>{showInputs?
            <div>{this.renderInputView()}</div>
            :
            <div>
                <div className="add-button">
                <Button onClick={this.setInputView} type="primary" ghost>Add Task</Button>
                <div className="todoList">{this.renderTable()}</div>
                </div>
            </div>}</div>}
            </div>
    }
}
export default TodoList