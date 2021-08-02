import React, { useState,useEffect } from 'react';
import { addDistrictData,getDisState} from '../../state/features/districtSlice';
import { DistrictList } from '../../state/features/districtSlice';
import { useSelector,useDispatch } from 'react-redux';

const Filter: React.FC = () => {

    // using component state to hold a couple of vars
    const [activeToggle,setToggle] = useState(false);
    const [getDistId,setDistdID] = useState('');

    // initialized key as let
    let key = 0; 

    // setting users var to sitrict list array
    let users:Array<DistrictList>;

    // setting dispatch
    const dispatch = useDispatch();
    
    // getting district state
    const distState = useSelector(getDisState);

    // async fetching of json/dipatching the data to add to state
    const fetchDistrictList = async () :Promise<void> =>{
        await fetch("../../../districts.json").then(res=>res.json()).then(data=>{
            pushToArray(data);
            users.forEach(user=>{
                dispatch(addDistrictData(user));
            });
        });
    };

    // function to add to new array
    const pushToArray = (data:Array<DistrictList>):void =>{
        users = data;
    };

    // filter function to display/ undisplay by boolean value
    const displayAllUsers = ():void => {

        const allUserData = document.querySelectorAll('.user-data');
        allUserData.forEach(user=>{
            if(user.children[0].children[5].innerHTML=='False' ){
                user.classList.add('non-display');
            } 
            if(!activeToggle){
                user.classList.remove('non-display');
            }
        });
    };

    // toggle handler // on off in a sense
    const handleToggleChange = ():void => {
        setToggle(prevState=>!prevState);
    };

    // setting id of district to component state 
    const handleOptionChange = ():void => {
        const id:HTMLInputElement = document.querySelector('.optionSel1')as HTMLInputElement;
        setDistdID(id.value);
    };

    // filters district by ID obtained and stored within component state
    const filterById = ():void =>{
        const allUserData = document.querySelectorAll('.user-data');
        allUserData.forEach(user=>{
            if(user.children[0].children[4].innerHTML !== getDistId){
                user.classList.add('non-display2');
            } else if(user.children[0].children[4].innerHTML === getDistId){
                user.classList.remove('non-display2');
            } 
            if(getDistId==='0'){
                user.classList.remove('non-display2');
            } 
        });
    };

    // function to revert all filters
    const clearFilter = ():void =>{
        setDistdID('0');
        setToggle(false);
        const optSel:HTMLInputElement = document.querySelector('.optionSel1') as HTMLInputElement;
        optSel.value='0';
    };

    // use effect methods to run on state changes
    useEffect(() => {
        displayAllUsers();
    }, [activeToggle]);//using dependancy array

    useEffect(() => {
        fetchDistrictList();
    },[]);

    useEffect(() => {
        filterById();
    },[getDistId]);//using dependancy array

    return (
        <div className='filter-container'>
            <label htmlFor="district">Filter by District: </label>
            <select className='optionSel1' name="district" onChange={handleOptionChange} >
                <option value='0'> Please Select a District</option>
                {distState.dist.map(item=>
                //mapping new options based on districs
                {return <option value={item.id} key={key=key+1}>{item.name}, {item.city}</option>;}
                )}
            </select>
            <br/>
            <label htmlFor="activeUsers">Active Users Only: </label>
            <input type="checkbox" name="activeUsers" checked={activeToggle} onChange={handleToggleChange} />
            <br />
            <label htmlFor="activeUsers">Clear All Filters:</label>
            <button onClick={clearFilter}>Clear Filters</button>

        </div>
    );
};

export default Filter;
