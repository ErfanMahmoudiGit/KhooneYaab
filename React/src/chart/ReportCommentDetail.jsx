// import { useEffect, useState } from 'react'
// import classNames from 'classnames'
// import {API_GET_BUILDING_COMMENT, API_GETHOUSE_DETAILS} from '../services/apiServices'
// import {CCard,CCardBody,CCardFooter,CCardHeader,CCol,CProgress,CRow,CTable,CTableBody,CTableDataCell,CTableHead,CTableHeaderCell,CTableRow,} from '@coreui/react'

// import WidgetsDropdown from './WidgetsDropdown'
// import MainChart from './MainChart'
// import { useParams } from 'react-router-dom'
// import jalaali from 'jalaali-js';

// const ReportCommentDetail = () => {
//   const params = useParams()
//   const [commentData,setCommentData] = useState([])
//   // console.log("commnets: ",commentData);
//   const[detail,setDetail] = useState([])


//   function convertToShamsi(gregorianDateString) {
//     // Parse the input date string to a Date object
//     const date = new Date(gregorianDateString);
  
//     // Extract the UTC year, month, and day
//     const year = date.getUTCFullYear();
//     const month = date.getUTCMonth() + 1; // getUTCMonth() returns 0-indexed months
//     const day = date.getUTCDate();
  
//     // Convert the Gregorian date to Shamsi (Jalali) date
//     const shamsiDate = jalaali.toJalaali(year, month, day);
  
//     // Return the Shamsi date in yyyy-mm-dd format
//     return `${shamsiDate.jy}-${shamsiDate.jm}-${shamsiDate.jd}`;
//   }
 
//   useEffect(()=>{
//     let resp = API_GET_BUILDING_COMMENT(params.id)
//     console.log(resp);
//     resp.then((res)=>{
//       // console.log(res.data);
//       setCommentData(res.data)
      
//     })

//   },[])

//   // console.log(detail.times_viewed);
  
//   useEffect(()=>{
//     // setIsLoading(true)
//     const fetchHouseDetails = async () => {
//         try {
//             let res = await API_GETHOUSE_DETAILS(params.id);
//             console.log("res: ", res);
            
//             if (res.status === 200) {
//                 console.log("success");
//                 console.log(res.data);
//                 await setDetail(res.data);
//                 // setIsLoading(false)
//             } else {
//                 console.log("false");
//                 // setIsLoading(false)
//             }
//         } catch (error) {
//             console.error("Error fetching house details:", error);
//             // setIsLoading(false)
//         }
//     };

//     fetchHouseDetails();
// },[])
//   const badSentimentCount = commentData.filter(item => item.sentiment === 'bad').length;
//   const goodSentimentCount = commentData.filter(item => item.sentiment === 'good').length;
//   const neutralSentimentCount = commentData.filter(item => item.sentiment === 'neutral').length;
//   const commentLength = commentData.length;
//   const badPercent = badSentimentCount / commentLength;
//   const goodPercent = goodSentimentCount / commentLength;
//   const neutralPercent = neutralSentimentCount / commentLength;


//   const progressExample = [
//     { title: 'نظرات مثبت', percent: Math.round( goodPercent * 100), color: 'success' },
//     { title: 'نظرات منفی', percent: Math.round(badPercent * 100), color: 'danger' },
//     { title: 'نظرات خنثی', percent: Math.round(neutralPercent * 100), color: 'primary' },
//   ]
//   return (
//     <>
//       <WidgetsDropdown className="mb-4" view={detail?.times_viewed} commentLength={commentLength} neutralSentimentCount={neutralSentimentCount} badSentimentCount={badSentimentCount} goodSentimentCount={goodSentimentCount}/>
//       <CCard className="mb-4">
//         <CCardBody>
//           <CRow>
//             <CCol sm={12}>
//               <h4 id="traffic" className="card-title mb-0">
//                 آمار نظرات آگهی {detail?.title}
//               </h4>
//               <div className="small text-body-secondary">آگهی شده در {detail?.city}</div>
//               <div className="small text-body-secondary">شهریور 1403</div>
//             </CCol>
            
//           </CRow>
//           <MainChart commentData={commentData}/>
//         </CCardBody>
//         <CCardFooter>
//           <CRow
//             xs={{ cols: 1, gutter: 4 }}
//             sm={{ cols: 2 }}
//             lg={{ cols: 4 }}
//             xl={{ cols: 5 }}
//             className="mb-2 text-center d-flex justify-content-center"
//           >
//             {progressExample.map((item, index, items) => (
//               <CCol
//                 className={classNames({
//                   'd-none d-xl-block': index + 1 === items.length,
//                 })}
//                 key={index}
//               >
//                 <div className="text-body-secondary">{item.title}</div>
//                 <div className="fw-semibold text-truncate">
//                   {item.value} ({item.percent}%)
//                 </div>
//                 <CProgress thin className="mt-2" color={item.color} value={item.percent} />
//               </CCol>
//             ))}
//           </CRow>
//         </CCardFooter>
//       </CCard>
//       <CRow>
//         <CCol xs>
//           <CCard className="mb-4">
//             <CCardHeader>جزییات نظرات</CCardHeader>
//             <CCardBody>

//               <CTable align="middle" className="mb-0 border" hover responsive>
//                 <CTableHead className="text-nowrap">
//                   <CTableRow>
//                     <CTableHeaderCell className="bg-body-tertiary">نام کاربر</CTableHeaderCell>
//                     <CTableHeaderCell className="bg-body-tertiary">شناسه کاربر</CTableHeaderCell>
//                     <CTableHeaderCell className="bg-body-tertiary ">نظر</CTableHeaderCell>
//                     <CTableHeaderCell className="bg-body-tertiary">تاریخ ثبت نظر</CTableHeaderCell>
//                     <CTableHeaderCell className="bg-body-tertiary ">تحلیل نظر</CTableHeaderCell>
//                   </CTableRow>
//                 </CTableHead>
//                 <CTableBody>
               
//                   {commentData.map((item, index) => (
//                     <CTableRow v-for="item in tableItems" key={index}>
//                        <CTableDataCell> <div>{item.writer_name}</div> </CTableDataCell>
//                        <CTableDataCell> <div>{item.writer_id}</div> </CTableDataCell>
//                        <CTableDataCell>
//                         <div className={`${item.sentiment == 'bad'? 'filter-color': item.sentiment == 'good' ? 'positive-color' : 'nodiff-color'}`}>{item.description}</div>

//                        </CTableDataCell>
//                        <CTableDataCell>
//                         <div>{convertToShamsi(item.created_at)}</div>

//                        </CTableDataCell>
//                        <CTableDataCell>
//                         <div>{item.sentiment=='bad'?'منفی': item.sentiment == 'good' ? 'مثبت' : 'خنثی'}</div>
//                        </CTableDataCell>  
//                     </CTableRow>
//                   ))}
//                 </CTableBody>
//               </CTable>
//             </CCardBody>
//           </CCard>
//         </CCol>
//       </CRow>
//     </>
//   )
// }

// export default ReportCommentDetail;


import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { API_GET_BUILDING_COMMENT, API_GETHOUSE_DETAILS } from '../services/apiServices';
import { CCard, CCardBody, CCardFooter, CCardHeader, CCol, CProgress, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import WidgetsDropdown from './WidgetsDropdown';
import MainChart from './MainChart';
import { useParams } from 'react-router-dom';
import jalaali from 'jalaali-js';
import { TablePagination } from '@mui/material';

const ReportCommentDetail = () => {
  const params = useParams();
  const [commentData, setCommentData] = useState([]);
  const [detail, setDetail] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  function convertToShamsi(gregorianDateString) {
    const date = new Date(gregorianDateString);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const shamsiDate = jalaali.toJalaali(year, month, day);
    return `${shamsiDate.jy}-${shamsiDate.jm}-${shamsiDate.jd}`;
  }

  useEffect(() => {
    API_GET_BUILDING_COMMENT(params.id).then((res) => {
      setCommentData(res.data);
    });
  }, [params.id]);

  useEffect(() => {
    const fetchHouseDetails = async () => {
      try {
        let res = await API_GETHOUSE_DETAILS(params.id);
        if (res.status === 200) {
          setDetail(res.data);
        }
      } catch (error) {
        console.error("Error fetching house details:", error);
      }
    };

    fetchHouseDetails();
  }, [params.id]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedComments = commentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const badSentimentCount = commentData.filter((item) => item.sentiment === 'bad').length;
  const goodSentimentCount = commentData.filter((item) => item.sentiment === 'good').length;
  const neutralSentimentCount = commentData.filter((item) => item.sentiment === 'neutral').length;
  const commentLength = commentData.length;

  return (
    <>
      <WidgetsDropdown view={detail?.times_viewed} commentLength={commentLength} neutralSentimentCount={neutralSentimentCount} badSentimentCount={badSentimentCount} goodSentimentCount={goodSentimentCount} />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={12}>
              <h4 className="card-title mb-0">آمار نظرات آگهی {detail?.title}</h4>
              <div className="small text-body-secondary">آگهی شده در {detail?.city}</div>
              <div className="small text-body-secondary">شهریور 1403</div>
            </CCol>
          </CRow>
          <MainChart commentData={commentData} />
        </CCardBody>
      </CCard>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>جزییات نظرات</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell>ردیف</CTableHeaderCell>
                    <CTableHeaderCell>نام کاربر</CTableHeaderCell>
                    <CTableHeaderCell>شناسه کاربر</CTableHeaderCell>
                    <CTableHeaderCell>نظر</CTableHeaderCell>
                    <CTableHeaderCell>تاریخ ثبت نظر</CTableHeaderCell>
                    <CTableHeaderCell>تحلیل نظر</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {paginatedComments.map((item, index) => (
                    
                    <CTableRow key={index} style={{ backgroundColor: page * rowsPerPage + index  % 2 === 0 ? '#f0f0f0' : 'white' , cursor:"pointer"}}>
                          <CTableDataCell>{page * rowsPerPage + index + 1}</CTableDataCell>
                      <CTableDataCell>{item.writer_name}</CTableDataCell>
                      <CTableDataCell>{item.writer_id}</CTableDataCell>
                      <CTableDataCell>
                        <div className={`${item.sentiment === 'bad' ? 'filter-color' : item.sentiment === 'good' ? 'positive-color' : 'nodiff-color'}`}>{item.description}</div>
                      </CTableDataCell>
                      <CTableDataCell>{convertToShamsi(item.created_at)}</CTableDataCell>
                      <CTableDataCell>{item.sentiment === 'bad' ? 'منفی' : item.sentiment === 'good' ? 'مثبت' : 'خنثی'}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              <div className="d-flex justify-content-center align-items-center">

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={commentData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="تعداد ردیف‌ها در هر صفحه:"
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} از ${count !== -1 ? count : `بیشتر از ${to}`}`
                }
              />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default ReportCommentDetail;
