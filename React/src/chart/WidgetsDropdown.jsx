/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react'
import {CRow,CCol,CWidgetStatsA} from '@coreui/react'
import { getStyle } from '@coreui/utils'

const WidgetsDropdown = ({view,badSentimentCount,goodSentimentCount,neutralSentimentCount,commentLength}) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2])

  return (
    <CRow className='p-2' xs={{ gutter: 4 }}>
     
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="success"
          value={
            <div className='d-flex justify-content-center align-items-center gap-4 p-4'>
              <div className='me-3 pt-2 pb-3'>تعداد کل نظرات</div>
              <div className='pt-2 pb-3'>{commentLength}</div>
            </div>
          }
          
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="danger"
          value={
            <div className='d-flex justify-content-center align-items-center gap-4 p-4'>
              <div className='me-3 pt-2 pb-3'>تعداد کل بازدیدها</div>
              <div className='pt-2 pb-3'>{view}</div>
            </div>
          }
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="primary" 
          title={
            <div>
            
              <div className='d-flex justify-content-between gap-4 p-2'>
                  <div>تعداد نظرات مثبت </div>
                   <div>{goodSentimentCount}</div>
                 </div>
              <div className='d-flex justify-content-between gap-4 p-2'>
                  <div>تعداد نظرات خنثی </div>
                   <div>{neutralSentimentCount}</div>
                 </div>
              <div className='d-flex justify-content-between gap-4 p-2'>
                  <div>تعداد نظرات منفی </div>
                   <div>{badSentimentCount}</div>
                 </div>
            </div>
          }
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
