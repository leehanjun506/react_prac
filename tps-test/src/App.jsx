import { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [responseData, setResponseData] = useState(null);
    const [requestData, setRequestData] = useState({}); // POST 요청으로 보낼 데이터 상태
    const apiUrl = 'http://api.tps.com:31062/backend/api/backend/test';
    // POST 요청을 보내는 함수
    const postData = async () => {
        console.log(requestData.field1);
        console.log(requestData.field2);
        try {
            const response = await axios.get(apiUrl,{
                headers: {
                    'Content-Type': 'application/json',
                    'userId': requestData.field1,
                    'accessToken': requestData.field2
                },
            });
            setResponseData(response.data);
            console.log(response.status);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // 입력 필드 값 변경 시 상태 업데이트
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRequestData({ ...requestData, [name]: value });
    };

    return (
        <div>
            <h1>API 호출 예제</h1>
            {/* 입력 필드 */}
            <input type="text" name="field1" placeholder="userId" onChange={handleInputChange} />
            <input type="text" name="field2" placeholder="accessToken" onChange={handleInputChange} />
            {/* POST 요청 버튼 */}
            <button onClick={postData}>데이터 보내기</button>
            {/* 응답 데이터 표시 */}
            {responseData && (
                <div>
                    <h2>응답 데이터:</h2>
                    <pre>{JSON.stringify(responseData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default App;