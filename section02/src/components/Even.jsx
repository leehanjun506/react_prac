import React, {useEffect} from 'react';

const Even = (props) => {
    useEffect(() => {
        return () => {
            console.log("unmount");
        };
    }, []);
    return <div>짝수입니다.</div>
};

export default Even;