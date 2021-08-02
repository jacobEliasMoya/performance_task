import React, { useState,useEffect } from 'react';
import { addUserData, getUserState, UsersList } from '../../state/features/allDataSlice';
import { getDisState } from '../../state/features/districtSlice';
import { useSelector, useDispatch } from 'react-redux';

const NewUserForm: React.FC = () => {

    // getting global state
    const userState = useSelector(getUserState);
    const districtState = useSelector(getDisState);

    // another alphabet Array
    const aplhaBetArr = ['N/A','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    
    // getting new data
    const newDate:Date = new Date();
    const curdate = `${newDate.getFullYear()}-${newDate.getMonth()}-${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;

    // intializing dispatch
    const dispatch = useDispatch();

    // Component state being initialized
    const [curTime,setCurrTime] = useState(curdate);
    const [newNum,setNewNum] = useState(0);
    const [newUserFName,setNewUserFName] = useState('');
    const [newUserLName,setNewUserLName] = useState('');
    const [newUserEmail,setNewUserEmail] = useState('');
    const [newUserMI,setNewUserMI] = useState('');
    const [newUserDistrict,setNewUserDistrict] = useState('');

    // unique keys for mapped items
    let key2 = 300;

    // function to handle on change events
    const handleEditChange = () =>{
        emailValidation(0);
        letterValidation(0);
        letterValidation(1);
        dropDownValidation();
    };

    // closes new user menu
    const untriggerNewUser = ():void => {
        document.querySelector('.newUser')?.classList.remove('selected1');
        document.querySelector('.app-admin-panel')?.classList.remove('selected');
        revertInputs();
    };

    // email validation
    const emailValidation = (num:number):void =>{
        const email:HTMLInputElement = document.querySelector('.newuserEmail') as HTMLInputElement;
        const emailLbl:HTMLLabelElement = document.querySelector('.emaillabeluser') as HTMLLabelElement;

        if(num ===0){
            if(email.value.length > 0){
                if(!email.value.includes('.') || !email.value.includes('@')){
                    email.classList.add('error');
                    emailLbl.classList.add('error');
                    setNewUserEmail('');
                }else{
                    email.classList.remove('error');
                    emailLbl.classList.remove('error');
                    setNewUserEmail(email.value);
                }
            }
        } else{
            if(!email.value.includes('.') || !email.value.includes('@')){
                email.classList.add('error');
                emailLbl.classList.add('error');
                setNewUserEmail('');
            }else{
                email.classList.remove('error');
                emailLbl.classList.remove('error');
                setNewUserEmail(email.value);
            }
        }
    };

    // letter validation
    const letterValidation = (mainSwitcher:number):void =>{
        const fname:any = document.querySelector('.newuserFname');
        const lname:any = document.querySelector('.newuserLname');

        if(mainSwitcher ===0){

            if(fname.value.match(1,2,3,4,5,6,7,8,9,0)){
                document.querySelector('.namefuser')?.classList.add('errorName');      
                setNewUserFName('');
            } else {
                document.querySelector('.namefuser')?.classList.remove('errorName');      
                setNewUserFName(fname.value);
            }
        } else {
            if(lname.value.includes(1,2,3,4,5,6,7,8,9,0)){
                document.querySelector('.nameluser')?.classList.add('errorName');      
                setNewUserLName('');
            } else {
                document.querySelector('.nameluser')?.classList.remove('errorName');      
                setNewUserLName(lname.value);
            }
        }

    };

    // dropdown validation
    const dropDownValidation = ():void =>{
        const miname:HTMLInputElement = document.querySelector('.newuserMInitial') as HTMLInputElement;
        const disname:HTMLSelectElement= document.querySelector('.newuserDistr') as HTMLSelectElement;
        const minameDD:HTMLLabelElement = document.querySelector('.dropdownMuser') as HTMLLabelElement;
        const disnameDD:HTMLLabelElement = document.querySelector('.dropdownDuser') as HTMLLabelElement;
        if(miname.value=='none'){
            minameDD.classList.add('errorM');
            setNewUserMI('');

        } else{
            minameDD.classList.remove('errorM');
            setNewUserMI(miname.value);
        }

        if(disname.value=='none'){
            disnameDD.classList.add('errorD');
            setNewUserDistrict('');

        } else{
            disnameDD.classList.remove('errorD');
            setNewUserDistrict(disname.value);
        }
    };

    // clears inputs
    const revertInputs = ():void => {
        const fname:HTMLInputElement = document.querySelector('.newuserFname') as HTMLInputElement;
        const lname:HTMLInputElement = document.querySelector('.newuserLname') as HTMLInputElement;
        const miname:HTMLSelectElement = document.querySelector('.newuserMInitial') as HTMLSelectElement;
        const disname:HTMLSelectElement = document.querySelector('.newuserDistr') as HTMLSelectElement;
        const email:HTMLInputElement = document.querySelector('.newuserEmail') as HTMLInputElement;

        document.querySelector('.nameluser')?.classList.remove('errorName');
        document.querySelector('.namefuser')?.classList.remove('errorName');
        document.querySelector('.dropdownDuser')?.classList.remove('errorD');
        document.querySelector('.emaillabeluser')?.classList.remove('error');

        fname.value='';
        lname.value='';
        miname.value='none';
        disname.value='none';
        email.value='';
    };

    // adds new user to store/global state
    const specifyNewUser = ():void => {
        if(newUserFName.length < 1 || newUserLName.length<1||newUserDistrict==''||newUserEmail.length<1){
            if(newUserFName.length < 1){document.querySelector('.namefuser')?.classList.add('errorName');}
            if(newUserLName.length<1){document.querySelector('.nameluser')?.classList.add('errorName');}
            if(newUserDistrict==''){document.querySelector('.dropdownDuser')?.classList.add('errorD');}
            if(newUserEmail.length<1){document.querySelector('.emaillabeluser')?.classList.add('error');}        
        }else{
            const ID:HTMLSpanElement = document.querySelector('.mainID')as HTMLSpanElement;
            const spanNum = ID.innerHTML;
            const newID=parseInt(spanNum);
            setCurrTime(`${newDate.getFullYear()}-${newDate.getMonth()}-${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`);
            const updatedUser = {id:newID,first_name:newUserFName,last_name:newUserLName,email:newUserEmail,verified:false,middle_initial:newUserMI,created_at:curdate,district:parseInt(newUserDistrict),active:true};
            const objPayload:UsersList = updatedUser;
            dispatch(addUserData(objPayload));
            untriggerNewUser();
            revertInputs();
        }
    };

    // vars used to obtain new ID #
    let num = 0;
    let newUserID:number;
    let newUser:UsersList;

    // setting component state to new ID for later function
    useEffect(()=>{
        for(let i=0;i<userState.user.length;i++){
            newUser = userState.user[num];
            newUserID = newUser.id;
            num++;
        }
        if(newUserID>0){
            setNewNum(newUserID);
        }
    },[userState]);

    return (   
        <span  className='newUser'>
            <form>
                <h2>Add New User</h2>
                <span className='idspan'>
                    <h4>Time: {curTime}</h4>
                    <h4>ID: <span className='mainID'>{newNum+1}</span></h4>
                </span>
                <label className='namefuser'>First Name</label>
                <input onChange={handleEditChange} className='newuserFname' type="text" placeholder='New First Name'  />
                <label className='nameluser'>Last Name</label>
                <input onChange={handleEditChange} className='newuserLname ' type="text" placeholder='New Last Name'  />
                <label className='emaillabeluser' >Email</label>
                <input onChange={handleEditChange} className='newuserEmail' placeholder='New Email'  />
                <label className='dropdownMuser' >Middle Initial</label>
                <select onChange={handleEditChange} className='newuserMInitial'  >
                    <option value={'none'}>Please Select a Letter</option>
                    {aplhaBetArr.map(item=>{
                        return <option key={key2+=key2} value={item}>{item}</option>;
                    },1000)}
                </select>
                <label className='dropdownDuser'>District</label>
                <select onChange={handleEditChange} className='newuserDistr' >
                    <option value='none'>Please Select a District</option>
                    {districtState.dist.map(item=>{
                        return <option key={key2 = key2 +1} value={item.id}>{item.name}, {item.city}</option>
                        ;})}
                </select>    
       
            </form>    
            <span>
                <button onClick={specifyNewUser}  className='yes'>Confirm</button>
                <button onClick={untriggerNewUser}  className='no'>Cancel</button>
            </span>         
        </span>
    );
};

export default NewUserForm;