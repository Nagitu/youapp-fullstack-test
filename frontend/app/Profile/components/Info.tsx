import React from 'react'

type InfoProps ={
    category : string;
    value:string;
}
const Info:React.FC<InfoProps> = ({category,value}) => {
    return (
        <div>
            <div className="flex ">
                <span className="text-white opacity-30">{category}:
                </span>
                    <span className="text-white">{value}
                    </span>
            </div>
        </div>
    )
}

export default Info