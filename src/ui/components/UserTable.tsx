import React,{MouseEvent, useEffect, useState} from 'react';
import Filter from './Filter';
import { useSelector,useDispatch } from 'react-redux';
import { addUserData, removeUserData, replaceUserData } from '../../state/features/allDataSlice';
import { UsersList } from '../../state/features/allDataSlice';
import {  getDisState } from '../../state/features/districtSlice';
import { getUserState } from '../../state/features/allDataSlice';


const UserTable: React.FC = () => {

    // decalring all component state, will be used to /edit delete userdata from global state in store
    const [delID,setDelID] = useState('');
    const [editID,setEditID] = useState('');
    const [newFirstName,setNewFirstName] = useState('');
    const [newLastName,setNewLastName] = useState('');
    const [newMiddleInitial,setNewMiddleInitial] = useState('');
    const [newDistrict,setNewDestrict] = useState('');
    const [newEmail,setNewEmail] = useState('');

    // setting dispatch
    const dispatch = useDispatch();


    // setting state variables from global state 
    const userState = useSelector(getUserState);
    const districtState = useSelector(getDisState);

    // initializing keys for mapping
    let key = 0;
    let key2 = 300;

    // array to hold aphabet, to be mapped over later
    const aplhaBetArr = ['N/A','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    // intilizing array with state of array of userlist objs
    let users:Array<UsersList> = [];

    // async fetching of users information and dispatching of array
    const fetchUserList = async ()=>{
        await fetch("../../../users.json").then(res=>res.json())
            .then(data=>{
                pushToArray(data);
                users.forEach(user=>{
                    dispatch(addUserData(user));
                });
            });
    };

    // function to add class to signal selected elm
    const displayDelConfirmation = () :void =>{
        const elm = document.querySelector('.delete-confirmation');
        elm?.classList.add('selected');
    };

    // function to add class to signal selected elm
    const displayEditConfirmation = () :void =>{
        const elm = document.querySelector('.edit-confirmation');
        elm?.classList.add('selected');
    };
    
    // function that uses event listener to obtain ID of item to be deleted
    const getDelID = (event: MouseEvent<HTMLButtonElement>):void =>{
        const button:any = event.target;
        button.parentNode.parentNode.classList.add('to-be-deleted');
        setDelID(button.parentNode.parentNode.firstChild.firstChild.innerHTML);
        document.querySelector('.app-admin-panel')?.classList.add('selected');
        displayDelConfirmation();
    };
    // function that uses event listener to obtain ID of item to be edited
    const getEditID = (e: React.MouseEvent<HTMLButtonElement>):void =>{
        const button:any = e.target;
        button.parentNode.parentNode.classList.add('to-be-edited');
        setEditID(button.parentNode.parentNode.firstChild.firstChild.innerHTML);
        document.querySelector('.app-admin-panel')?.classList.add('selected');
        displayEditConfirmation();
    };

    // setting data to an array for further manipluation
    const pushToArray = (data:Array<UsersList>):void =>{
        users = data;
    };

    // function that essentially confirms the deletion to specific item in state
    const specifyDel = (num:string):void => {

        userState.user.forEach(user=>{
            if(user['id'] == parseInt(num)){
                const filterIndex:number = userState.user.indexOf(user);
                document.querySelector('.to-be-deleted')?.classList.add('deleted');
                setTimeout(() => {
                    document.querySelectorAll('.user-data').forEach(elm=>{

                        elm.classList.remove('to-be-deleted','deleted');
                    });
                    dispatch(removeUserData(filterIndex)); 
                }, 500);                
                

            }
        });
    };

    // sets in motion the deletion of element by a specific ID  
    const confirmDel = ():void =>{
        specifyDel(delID);
        const elm = document.querySelector('.delete-confirmation');
        elm?.classList.remove('selected');
        document.querySelector('.app-admin-panel')?.classList.remove('selected');
    };

    // cancels delete and removes necessary information
    const cancelDel = ():void =>{
        document.querySelectorAll('.user-data').forEach(elm=>{
            elm.classList.remove('to-be-deleted','deleted');
        });
        const elm = document.querySelector('.delete-confirmation');
        elm?.classList.remove('selected');
        document.querySelector('.app-admin-panel')?.classList.remove('selected');

    };

    // funciton to revert state
    const revertState = ():void => {
        setNewFirstName('');
        setNewLastName('');
        setNewMiddleInitial('');
        setNewDestrict('');
        setNewEmail('');
    };

    // sets into motion the editing of element based off of edit ID
    const confirmEdit = ():void =>{
        specifyEdit(editID);
        revertState();
    };

    // function to complete the edit if certain criteria is met
    const specifyEdit = (num:string):void => {

        if(newFirstName.length < 1 || newLastName.length<1||newDistrict==''||newEmail.length<1){
            if(newFirstName.length < 1){document.querySelector('.namef')?.classList.add('errorName');}
            if(newLastName.length<1){document.querySelector('.namel')?.classList.add('errorName');}
            if(newDistrict==''){document.querySelector('.dropdownD')?.classList.add('errorD');}
            if(newEmail.length<1){document.querySelector('.emaillabel')?.classList.add('error');}        
        }else{
            const elm = document.querySelector('.edit-confirmation');
            elm?.classList.remove('selected');
    
            userState.user.forEach(user=>{
                if(user['id'] == parseInt(num)){
                    const filterIndex:number = userState.user.indexOf(user);
                    const updatedUser = {id:user.id,first_name:newFirstName,last_name:newLastName,email:newEmail,verified:user.verified,middle_initial:newMiddleInitial,created_at:user.created_at,district:parseInt(newDistrict),active:user.active};
                    //    using object payload to get edit comleted
                    const objPayload = {item1:filterIndex,item2:updatedUser};
                    document.querySelector('.to-be-edited')?.classList.add('edited','gogreen');
                    setTimeout(() => {
                        document.querySelectorAll('.user-data').forEach(elm=>{
                            elm.classList.remove('to-be-edited','edited');
                        });
                        document.querySelector('.app-admin-panel')?.classList.remove('selected');
                        dispatch(replaceUserData(objPayload)); 
                        revertInputs();
                    }, 500);
                }
            });
        }
    
    };

    const cancelEdit = ():void =>{
        const elm = document.querySelector('.edit-confirmation');
        elm?.classList.remove('selected');
        document.querySelector('.app-admin-panel')?.classList.remove('selected');
        revertInputs();
    };

    // functions run on change 
    const handleEditChange = () =>{
        emailValidation(0);
        letterValidation(0);
        letterValidation(1);
        dropDownValidation();
    };

    // validation
    const emailValidation = (num:number):void =>{
        const email:HTMLInputElement = document.querySelector('.newEmail') as HTMLInputElement;
        const emailLbl:HTMLLabelElement = document.querySelector('.emaillabel') as HTMLLabelElement;

        if(num ===0){
            if(email.value.length > 0){
                if(!email.value.includes('.') || !email.value.includes('@')){
                    email.classList.add('error');
                    emailLbl.classList.add('error');
                }else{
                    email.classList.remove('error');
                    emailLbl.classList.remove('error');
                    setNewEmail(email.value);
                }
            }
        } else{
            if(!email.value.includes('.') || !email.value.includes('@')){
                email.classList.add('error');
                emailLbl.classList.add('error');
            }else{
                email.classList.remove('error');
                emailLbl.classList.remove('error');
                setNewEmail(email.value);
            }
        }
    };
    // validation
    const letterValidation = (mainSwitcher:number) =>{
        const fname:any = document.querySelector('.newFname');
        const lname:any = document.querySelector('.newLname');

        if(mainSwitcher ===0){
            if(fname.value.match(1,2,3,4,5,6,7,8,9,0)){
                document.querySelector('.namef')?.classList.add('errorName');      
                setNewFirstName('');
            } else {
                document.querySelector('.namef')?.classList.remove('errorName');      
                setNewFirstName(fname.value);
            }
        } else {
            if(lname.value.match(1,2,3,4,5,6,7,8,9,0)){
                document.querySelector('.namel')?.classList.add('errorName');      
                setNewLastName('');
            } else {
                document.querySelector('.namel')?.classList.remove('errorName');      
                setNewLastName(lname.value);
            }
        }

    };
    // validation
    const dropDownValidation = () =>{   
        const miname:HTMLInputElement = document.querySelector('.newMInitial') as HTMLInputElement;
        const disname:HTMLInputElement = document.querySelector('.newDistr') as HTMLInputElement;
        const minameDD:HTMLLabelElement = document.querySelector('.dropdownM') as HTMLLabelElement;
        const disnameDD:HTMLLabelElement = document.querySelector('.dropdownD') as HTMLLabelElement;

        if(miname.value=='none'){
            minameDD.classList.add('errorM');
            setNewMiddleInitial('');

        } else{
            minameDD.classList.remove('errorM');
            setNewMiddleInitial(miname.value);
        }

        if(disname.value=='none'){
            disnameDD.classList.add('errorD');
            setNewDestrict('');

        } else{
            disnameDD.classList.remove('errorD');
            setNewDestrict(disname.value);
        }
    };
    // reverts inputs
    const revertInputs = ():void => {
        const fname:HTMLInputElement = document.querySelector('.newFname') as HTMLInputElement;
        const lname:HTMLInputElement = document.querySelector('.newLname') as HTMLInputElement;
        const miname:HTMLSelectElement = document.querySelector('.newMInitial') as HTMLSelectElement;
        const disname:HTMLSelectElement = document.querySelector('.newDistr') as HTMLSelectElement;
        const email:HTMLInputElement = document.querySelector('.newEmail') as HTMLInputElement;

        document.querySelector('.namel')?.classList.remove('errorName');
        document.querySelector('.namef')?.classList.remove('errorName');
        document.querySelector('.dropdownD')?.classList.remove('errorD');
        document.querySelector('.emaillabel')?.classList.remove('error');

        fname.value='';
        lname.value='';
        miname.value='none';
        disname.value='none';
        email.value='';
    };

    // brings up new user form
    const triggerNewUser = () => {
        document.querySelector('.newUser')?.classList.add('selected1');
        document.querySelector('.app-admin-panel')?.classList.add('selected');
        const elm = document.querySelector('.delete-confirmation');
        elm?.classList.remove('selected');
        const elm2 = document.querySelector('.edit-confirmation');
        elm2?.classList.remove('selected');

    };

    // on load fetches user list
    useEffect(()=>{
        if(users.length<1){
            fetchUserList();
        }
    },[]);

    // useEffect(()=>{
    //     console.log(newFirstName,newLastName,newMiddleInitial,newDistrict);
    // },[newFirstName,newLastName,newMiddleInitial,newDistrict]);

    return (
        <div className="admin-user-table">
            <div className='inner-table'>
                <h2>USER LIST</h2>
                <div className='delete-confirmation'>
                    <h1>Are you Sure you want to delete this item?</h1>

                    <span>
                        <button onClick={confirmDel} className='yes'>YES</button>
                        <button onClick={cancelDel} className='no'>NO</button>
                    </span>
                </div>
                <div className='edit-confirmation'>
                    <h1>Please enter your new Information.</h1>
                    <form className='newInformation'>
                        <label className='namef'>First Name</label>
                        <input onChange={handleEditChange} className='newFname' type="text" placeholder='New First Name'  />
                        <label className='namel'>Last Name</label>
                        <input onChange={handleEditChange} className='newLname ' type="text" placeholder='New Last Name' />
                        <label className='emaillabel' >Email</label>
                        <input onChange={handleEditChange} className='newEmail' type="email" placeholder='New Email' />
                        <label className='dropdownM' >Middle Initial</label>
                        <select onChange={handleEditChange} className='newMInitial' >
                            <option value={'none'}>Please Select a Letter</option>
                            {aplhaBetArr.map(item=>{
                                return <option key={key2+=key2} value={item}>{item}</option>;
                            })}
                        </select>
                        <label className='dropdownD'>District</label>
                        <select onChange={handleEditChange} className='newDistr'  >
                            <option value='none'>Please Select a District</option>
                            {districtState.dist.map(item=>{
                                return <option key={key2 = key2 +1} value={item.id}>{item.name}, {item.city}</option>
                                ;})}
                        </select>                    
                    </form>
                    <span>
                        <button onClick={confirmEdit} className='yes'>Confirm</button>
                        <button onClick={cancelEdit} className='no'>Cancel</button>
                    </span>
                </div>
                <ul style={{listStyle: 'none'}}>
                    <li className={'li one'}>
                        <div>
                            <div >ID</div>
                            <div >Last Name</div>
                            <div >First Name</div>
                            <div >M.I.</div>
                            <div >District</div>
                            <div >Verified</div>
                            <div >Created</div>
                        </div>
                    </li>

                    {userState.user.map(item=>{
                        return(
                            <li className='user-data' key={key=key+1 }>
                                <div>
                                    <div >{item.id}</div>
                                    <div >{item.last_name}</div>
                                    <div >{item.first_name}</div>
                                    <div >{item.middle_initial ? item.middle_initial:'N/A'}</div>
                                    <div >{item.district}</div>
                                    <div className='verified'>{item.verified ? 'True':'False'}</div>
                                    <div >{item.created_at}</div>
                                </div>
                                <div className='control-buttons'>
                                    <button onClick={getEditID} className='edit' type="button">Edit</button>
                                    <button onClick={getDelID} className='del' type="button">Delete</button>
                                </div>                        
                            </li>);
                    })}
                </ul>
                <span>
                    <Filter/>
                    <div className='add-new-user'>
                        <h4>Add New User</h4>
                        <i onClick={triggerNewUser} className="fa fa-plus"></i>
                    </div>
                </span>

            </div>       
        
        </div>
    );
};

export default UserTable;