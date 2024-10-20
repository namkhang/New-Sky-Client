import React , {useState , useRef, useEffect} from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import axios from 'axios'
import Footer from '../Layouts/Footer'
import Navbar from '../Layouts/NavbarForAdmin'
import SideBar from '../Layouts/SideBar'


function Upload() {
    const [result , setResult] = useState([])
    const save = useRef([[]])
     async function Up(){
         let formData = new FormData();
         for(let i = 0 ; i < document.getElementById('fileupload').files.length ; i++){
            formData.append('files' , document.getElementById('fileupload').files[i])
         }
        
         formData.append('type' , document.getElementById("type").value)
            let response = await axios.post('https://new-sky-server.onrender.com/uploadexcel' , formData);
            if(response.data === "kiem tra format file"){
                alert("Kiểm tra file và chọn đúng văn bản nhập cảnh là một hay nhiều người")
            }
            else{
                setResult(response.data.sort((a,b) => new Date(a.start_date.split("/")[2] , parseInt(a.start_date.split("/")[1]) - 1 , a.start_date.split("/")[0]) > new Date(b.start_date.split("/")[2] , parseInt(b.start_date.split("/")[1]) - 1 , b.start_date.split("/")[0]) ? 1 : -1))
                
            }
            
    }

    async function Export(){

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');
    
        worksheet.columns = [
          { header: 'Tên', key: 'name', width: 30 },
          {header: 'Số QLXCN', key: 'ref_number', width: 30 },
          { header: 'Giới tính', key: 'gender', width: 30 },
          { header: 'Ngày sinh', key: 'dayofbirth', width: 30 },
          { header: 'Số hộ chiếu', key: 'flightcode', width: 30 },
          { header: 'Ngày nhập cảnh', key: 'start_date', width: 50 },
          { header: 'Ngày kết thúc nhập cảnh', key: 'end_date', width: 50 },
          { header: 'Ngày còn lại', key: 'remainingDate', width: 30 },
          
        ];
    
        result.forEach(i =>{
            worksheet.addRows([
                { name: i.name, ref_number: i.ref_number, gender: i.gender , dayofbirth : i.dayofbirth , flightcode : i.flightcode , start_date : i.start_date , end_date : i.end_date , remainingDate: i.remainingDate },
              ]);
        }

        )

        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true }; 
          });


        
        result.forEach((i2 , index) => {
                if(i2.remainingDate >= 6 && i2.remainingDate <= 10){
                    console.log(index);
                    
                    worksheet.getRow(index + 2).eachCell((cell) => {
                        cell.fill = {
                          type: 'pattern',
                          pattern: 'solid',
                          fgColor: { argb: 'FFFF00' }
                        };
                      });
                }
                else if (i2.remainingDate < 6){
                    worksheet.getRow(index + 2).eachCell((cell) => {
                        cell.fill = {
                          type: 'pattern',
                          pattern: 'solid',
                          fgColor: { argb: 'FF0000' }
                        };
                      });
                }
                else{
                    
                }
        })
        
        
    
        const buffer = await workbook.xlsx.writeBuffer();
        const dataBlob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(dataBlob, 'danh-sach-khach-hang-nhap-canh.xlsx');

    }

    useEffect(async ()=> {
            let response = await axios.get("https://new-sky-server.onrender.com/get-passenger")
            setResult(response.data.sort((a,b) => new Date(a.start_date.split("/")[2] , parseInt(a.start_date.split("/")[1]) - 1 , a.start_date.split("/")[0]) > new Date(b.start_date.split("/")[2] , parseInt(b.start_date.split("/")[1]) - 1 , b.start_date.split("/")[0]) ? 1 : -1))
            
            
    }, [])

    // function Search(event){
    //         if(event.keyCode === 188){
    //             save.current = result ; 
    //             document.getElementById('search').value = ''
    //     }
    //         let search = document.getElementById('search').value.toLowerCase()
    //         let dataSearch = JSON.parse(localStorage.getItem('master-source'))
    //         let dataResult = dataSearch.filter( i => i[3].toLowerCase().indexOf(search) !== -1 ||  i[1].toLowerCase().indexOf(search) !== -1 ).sort()
    //         let reponseResult = [...save.current,...dataResult]
    //         setResult(reponseResult)
        
    // }

    return (
        <div>
        <Navbar/>
            <div id="layoutSidenav">
                <SideBar/>
                <div id="layoutSidenav_content">
                    <main>
                    
                        <div className="container-fluid px-4">
                            <h1 className="mt-4">Danh sách khách hàng nhập cảnh</h1>
                            <button style={{marginRight : "35px"}}  className="msg_send_btn" type="button">
                                    <i class="fas fa-download"></i>
                            </button>
                            <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item active">Home</li>
                            </ol>
                            <div className="row">

                
                        <div class="mb-3">
                        <label for="formFile" class="form-label"><b>File nhập cảnh được cục hàng không cấp (PDF)</b></label>
                        <input class="form-control" type="file" id="fileupload" multiple/>
                        <div>

                        <div>
                        <select class="form-select" aria-label="Default select example" id='type'>
                            <option selected value="single">Chỉ một khách hàng</option>
                            <option value="multiple">Nhiều khách hàng</option>
                        </select>
                        </div>

                        <br></br>
                        <button type="button" onClick={Up} class="btn btn-secondary">Tải lên</button>   
                        <button type="button" onClick={Export} id="export" class="btn btn-secondary">Tải xuống</button>   
                        </div>
                     
                        </div>

                      

                 <div className="col-xl-6">

            

    <div className="widget-49">



        <table class="table table-dark table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Tên</th>
      <th scope="col">Số QLXNC</th>
      <th scope="col">Giới tính</th>
      <th scope="col">Ngày sinh</th>
      <th scope="col">Số hộ chiếu</th>
      <th scope="col">Ngày nhập cảnh</th>
      <th scope="col">Ngày kết thúc nhập cảnh</th>
      <th scope="col">Số ngày nhập cảnh còn lại</th>
    </tr>
  </thead>
  <tbody>
  {result.map((i,index) =>   
    
    <tr>
    <th scope="row">{index + 1}</th>
    <td>{i.name}</td>
    <td>{i.ref_number}</td>
    <td>{i.gender}</td>
    <td>{i.dayofbirth}</td>
    <td>{i.flightcode}</td>
    <td>{i.start_date}</td>
    <td>{i.end_date}</td>
    <td>{i.remainingDate}</td>
  </tr>

   )}
    
  </tbody>
</table>

    </div>






        </div>

                            </div>                        
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
            </div>
      
    );



   
}

export default Upload;