import React, {useEffect, useState} from "react";

function FriendSearchBar({ originalList, setList, placeholder }) {
    const [ input, setInput ] = useState('');

    useEffect(() => {
        if (input.length === 0){
            setList(originalList)
            return
        }

        const filterUser = (user, input) => {
            const containsName = user.name.toLowerCase().includes(input.toLowerCase());
            const containsId = user.userId.toLowerCase().includes(input.toLowerCase());
            return containsName || containsId;
        }

        const filteredList = originalList.filter((item) => filterUser(item, input) )
        setList(filteredList)

    }, [input]);

    return(
        <>
            <div className="example">
                <input type="text" placeholder={placeholder} name="search" onChange={(e) => setInput(e.target.value)} />
                <button type="submit"><i className="bi bi-search"></i></button>
            </div>
        </>
    )
}

export default FriendSearchBar;