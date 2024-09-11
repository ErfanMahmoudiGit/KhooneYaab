import { useEffect, useState } from 'react'
import classNames from 'classnames'
import {API_GET_BUILDING_COMMENT, API_GETHOUSE_DETAILS} from '../services/apiServices'
import {CCard,CCardBody,CCardFooter,CCardHeader,CCol,CProgress,CRow,CTable,CTableBody,CTableDataCell,CTableHead,CTableHeaderCell,CTableRow,} from '@coreui/react'

import WidgetsDropdown from './WidgetsDropdown'
import MainChart from './MainChart'
import { useParams } from 'react-router-dom'
import jalaali from 'jalaali-js';

const ReportCommentDetail = () => {
 
  const [commentData,setCommentData] = useState([])
  console.log("commnets: ",commentData);
  const[detail,setDetail] = useState([])


  function convertToShamsi(gregorianDateString) {
    // Parse the input date string to a Date object
    const date = new Date(gregorianDateString);
  
    // Extract the UTC year, month, and day
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; // getUTCMonth() returns 0-indexed months
    const day = date.getUTCDate();
  
    // Convert the Gregorian date to Shamsi (Jalali) date
    const shamsiDate = jalaali.toJalaali(year, month, day);
  
    // Return the Shamsi date in yyyy-mm-dd format
    return `${shamsiDate.jy}-${shamsiDate.jm}-${shamsiDate.jd}`;
  }
  const gregorianDate = '2024-09-11T16:41:35.694Z';
const shamsiDate = convertToShamsi(gregorianDate);
console.log(shamsiDate);  // Outputs: "1403-6-21"


  // const users = [
  //   {
  //     NAME: 'علی مرادلو',
  //     owner_id:1,
  //     COMMENT:'قیمت مناسب',
  //     COMMENT_DATE: 'Jan 1, 2023',
  //     comment_status:'مثبت'
  //   },
  //   {
  //     NAME: 'رها خرسند',
  //     owner_id:2,
  //     COMMENT:'قیمت مناسب',
  //     COMMENT_DATE: 'Jan 1, 2023',
  //     comment_status:'مثبت'
  //   },
  //   {
  //     NAME: 'نیایش علیپور',
  //     owner_id:5,
  //     COMMENT:'حیف متراژش پایینه',
  //     COMMENT_DATE: 'Jan 1, 2023',
  //     comment_status:'منفی'
  //   }
  // ]
 
  const params = useParams()
  console.log(params.id);

  useEffect(()=>{
    let resp = API_GET_BUILDING_COMMENT(params.id)
    console.log(resp);
    resp.then((res)=>{
      console.log(res.data);
      setCommentData(res.data)
      
    })

  },[])

  console.log(detail.times_viewed);
  
  useEffect(()=>{
    // setIsLoading(true)
    const fetchHouseDetails = async () => {
        try {
            let res = await API_GETHOUSE_DETAILS(params.id);
            console.log("res: ", res);
            
            if (res.status === 200) {
                console.log("success");
                console.log(res.data);
                await setDetail(res.data);
                // setIsLoading(false)
            } else {
                console.log("false");
                // setIsLoading(false)
            }
        } catch (error) {
            console.error("Error fetching house details:", error);
            // setIsLoading(false)
        }
    };

    fetchHouseDetails();
},[])
  const badSentimentCount = commentData.filter(item => item.sentiment === 'bad').length;
  const goodSentimentCount = commentData.filter(item => item.sentiment === 'good').length;
  const neutralSentimentCount = commentData.filter(item => item.sentiment === 'neutral').length;
  const commentLength = commentData.length;
  const badPercent = badSentimentCount / commentLength;
  const goodPercent = goodSentimentCount / commentLength;
  const neutralPercent = neutralSentimentCount / commentLength;


  const progressExample = [
    { title: 'نظرات مثبت', percent:( goodPercent * 100), color: 'success' },
    { title: 'نظرات منفی', percent: (badPercent * 100), color: 'danger' },
    { title: 'نظرات خنثی', percent: (neutralPercent * 100), color: 'primary' },
  ]
  return (
    <>
      <WidgetsDropdown className="mb-4" view={detail?.times_viewed} commentLength={commentLength} neutralSentimentCount={neutralSentimentCount} badSentimentCount={badSentimentCount} goodSentimentCount={goodSentimentCount}/>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={12}>
              <h4 id="traffic" className="card-title mb-0">
                آمار نظرات آگهی {detail?.title}
              </h4>
              <div className="small text-body-secondary">آگهی شده در {detail?.city}</div>
              <div className="small text-body-secondary">شهریور 1403</div>
            </CCol>
            
          </CRow>
          <MainChart />
        </CCardBody>
        <CCardFooter>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 4 }}
            xl={{ cols: 5 }}
            className="mb-2 text-center d-flex justify-content-center"
          >
            {progressExample.map((item, index, items) => (
              <CCol
                className={classNames({
                  'd-none d-xl-block': index + 1 === items.length,
                })}
                key={index}
              >
                <div className="text-body-secondary">{item.title}</div>
                <div className="fw-semibold text-truncate">
                  {item.value} ({item.percent}%)
                </div>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>جزییات نظرات</CCardHeader>
            <CCardBody>
              {/* <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-body-secondary text-truncate small">New Clients</div>
                        <div className="fs-5 fw-semibold">9,123</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">
                          Recurring Clients
                        </div>
                        <div className="fs-5 fw-semibold">22,643</div>
                      </div>
                    </CCol>
                  </CRow>
                  <hr className="mt-0" />
                  {progressGroupExample1.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-body-secondary small">{item.title}</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="info" value={item.value1} />
                        <CProgress thin color="danger" value={item.value2} />
                      </div>
                    </div>
                  ))}
                </CCol>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Pageviews</div>
                        <div className="fs-5 fw-semibold">78,623</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Organic</div>
                        <div className="fs-5 fw-semibold">49,123</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  {progressGroupExample2.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">{item.value}%</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="warning" value={item.value} />
                      </div>
                    </div>
                  ))}

                  <div className="mb-5"></div>

                  {progressGroupExample3.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{' '}
                          <span className="text-body-secondary small">({item.percent}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.percent} />
                      </div>
                    </div>
                  ))}
                </CCol>
              </CRow>

              <br /> */}

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary">نام کاربر</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">شناسه کاربر</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary ">نظر</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">تاریخ ثبت نظر</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary ">تحلیل نظر</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
               
                  {commentData.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                       <CTableDataCell>
                        <div>{item.writer_name}</div>

                       </CTableDataCell>
                       <CTableDataCell>
                        <div>{item.writer_id}</div>

                       </CTableDataCell>
                       <CTableDataCell>
                        <div className={`${item.sentiment == 'bad'? 'filter-color': item.sentiment == 'good' ? 'positive-color' : 'nodiff-color'}`}>{item.description}</div>

                       </CTableDataCell>
                       <CTableDataCell>
                        <div>{convertToShamsi(item.created_at)}</div>

                       </CTableDataCell>
                       <CTableDataCell>
                        <div>{item.sentiment=='bad'?'منفی': item.sentiment == 'good' ? 'مثبت' : 'خنثی'}</div>

                       </CTableDataCell>

                      {/* <CTableDataCell>
                        <div>{item.user.name}</div>
                        <div className="small text-body-secondary text-nowrap">
                          <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                          {item.user.registered}
                        </div>
                      </CTableDataCell> */}
                      {/* <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                      </CTableDataCell> */}
                      {/* <CTableDataCell>
                        <div className="d-flex justify-content-between text-nowrap">
                          <div className="fw-semibold">{item.usage.value}%</div>
                          <div className="ms-3">
                            <small className="text-body-secondary">{item.usage.period}</small>
                          </div>
                        </div>
                        <CProgress thin color={item.usage.color} value={item.usage.value} />
                      </CTableDataCell> */}
                      {/* <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.payment.icon} />
                      </CTableDataCell> */}
                      {/* <CTableDataCell>
                        <div className="small text-body-secondary text-nowrap">Last login</div>
                        <div className="fw-semibold text-nowrap">{item.activity}</div>
                      </CTableDataCell> */}
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default ReportCommentDetail;
