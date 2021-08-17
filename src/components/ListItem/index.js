import {Component} from 'react'
import {EditTwoTone,DeleteFilled } from '@ant-design/icons';
import './index.css'

class ListItem extends Component {
    state={status:'Todo',statusCount:1,taskName:'',editView:false}

    changeStatus=(e)=>{
        const {statusCount}=this.state
        if(statusCount===1){
            this.setState(prevState=>({status:'In Progress',statusCount:prevState.statusCount+1}))
        }
        else if(statusCount===2){
            this.setState(prevState=>({status:'Complete',statusCount:prevState.statusCount+1}))
            e.target.disabled=true
        }
    }

    
    
    render() {
    const {status,statusCount}=this.state    
    const {item,deleteListItemExternal,editListItemExternal}=this.props
    const editListItemInternal=()=>{
        editListItemExternal(item.id)
    }
    const deleteListItemInternal=()=>{
        deleteListItemExternal(item.id)
    }
    
    let  dynamicstyle='black'
    if(statusCount===2){
        dynamicstyle='yellow'
    }  
    else if (statusCount===3){
        dynamicstyle='green'
    }

        return <tr className="list-item">
            <td className="table-heading">{item.id}</td>
            <td className="table-heading">{item.taskName}</td>
            <td className="table-heading"><button className={`status-button ${dynamicstyle}`} onClick={this.changeStatus}>{status}</button></td>
            <td className="table-heading"><button className="edit-button" onClick={editListItemInternal} ><EditTwoTone /></button></td>
            <td className="table-heading"><button className="delete-button" onClick={deleteListItemInternal}><DeleteFilled /></button></td>
        </tr>}
}


export default ListItem
