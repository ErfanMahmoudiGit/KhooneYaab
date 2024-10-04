export default function ReportCard({text,count,icon}){
    return(
        <>
            <div  className="text-center d-flex flex-column justify-content-center align-items-center card-bookmark"
                style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px', height:"200px",backgroundColor:"#ffffff",
                boxShadow: "0 4px 4px rgba(0, 0, 0, 0.2)"}}
                >
                    {icon}
                <span className='fw-bold text-center'>{text}</span>
                <span className='fw-bold text-center'>{count}</span>

            </div>
          
        </>
        
    )
}

