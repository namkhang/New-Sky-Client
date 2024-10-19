import React , {useState , useRef, useEffect} from 'react';
import axios from 'axios'


function Compare() {
    const [result , setResult] = useState(localStorage.getItem('result-source') ? JSON.parse(localStorage.getItem('result-source')) : [])
    const [url , setUrl] = useState(localStorage.getItem('url') ? JSON.parse(localStorage.getItem('url')) : '')



    function Search(event){
        
            let search = document.getElementById('search').value.toLowerCase()
            let dataSearch = JSON.parse(localStorage.getItem('result-source'))
            if(search === ''){
                setResult(dataSearch) 
            }
            else{
            let dataResult = dataSearch.filter( i => i[0].toLowerCase().indexOf(search) !== -1 || i[3].toLowerCase().indexOf(search) !== -1 || i[2].toLowerCase().indexOf(search) !== -1).sort()
            let reponseResult = [...dataResult]
            setResult(reponseResult)        
            }
        
    }

    async function Compare(){
        let formData = new FormData();
        formData.append('file' , document.getElementById('fileupload').files[0])
        let response = await axios.post('http://localhost:5000/compare' , formData);
        let data = response.data.data
        let final =  []
        let count = 1
        let compare = [... new Set(data.map( i => i[2]))]
        for (let i = 0 ; i < compare.length ; i++){
            let dataFilter = data.filter(it => it[2] === compare[i])
            let dataSort = dataFilter.sort((a ,b) => a[3].split(';').length > b[3].split(';').length ? -1 : 1 )
            let dataMap = dataSort.map(maps => [...maps , count])
            count ++
            for(let is = 0 ; is < dataMap.length ; is ++){
                final.push(dataMap[is])
            }
            
        }
        localStorage.setItem('result-source', JSON.stringify(final))
        localStorage.setItem('url', JSON.stringify(response.data.url))
        console.log(final);
        setResult(final)
        setUrl(response.data.url)
        
    }

    async function Export(url){
        let dataExport = [...result]
        dataExport = dataExport.map(it => it.map(i => i.toString().replace(/,/g , ';')))
        let csvString = ''
        dataExport.forEach(item => {    
            for (let value of item) {
                csvString+=`${value},` 
            }
            csvString+=`\r\n`
        })
        var encodedURI = 'data:text/csv;charset=utf-8,' +   encodeURI(csvString);
        var link = document.createElement('a');
        link.setAttribute('href', encodedURI);
        link.setAttribute('download', 'data.csv');
        document.body.appendChild(link); // Nếu không có element body, thì thêm vào một element khác
        link.click();
    }

     function selectColumnNeedToSearch(event){
        let index = event.target.value === "Group" ? 5 : 0
        let dataSort = result.sort((a ,b) => a[index] > b[index] ? 1 : -1 )
        localStorage.setItem('result-source', JSON.stringify(dataSort))
        setResult([...dataSort])
    }


    return (
        <div>
                <input onKeyUp={Search} id='search' type='text'  placeholder='nhap ma'/>
                <input type='file' id='fileupload' />
                <button onClick={Compare} type='button' >Comapre</button>
                <button onClick={() => Export(url)} type='button' >Export</button>
                <select onChange={selectColumnNeedToSearch} defaultValue="Group" id="reporttemplate" className="form-select" aria-label="Default select example">
                            <option value="0" disabled>Choose column to sort...</option>
                            <option value="Group">Group</option>
                            <option value="Statement Index">Statement Index</option>
                                 
                </select>
                <table>
                <tr>
                                <td style={{margin : '30px'}}>Statement Index</td>
                                <td style={{margin : '30px'}}>Standard Statement (Master Source)</td>
                                <td style={{margin : '30px'}}>Thread ID (Source)</td>
                                <td style={{margin : '30px'}}>Controls (Source) (Directive/Preventive/Corrective/Detective) / Security requirements</td>
                                <td style={{margin : '30px'}}>Match Character</td>
                                <td style={{margin : '30px'}}>Group</td>
                    </tr>
         
                {result.map(i => 
                    <tr>
                        {i.map(it => 
    
                                <td style={{margin : '30px'}}>{it}</td>
                            
                        )}
                    </tr>
                    )}
                    </table>
                
           
        </div>
    );
}

export default Compare;