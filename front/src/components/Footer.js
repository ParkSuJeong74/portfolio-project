import Style from '../App.module.css'

function Footer(){
    
    return (
        <div class={Style.footer} style={{
            backgroundColor: 'white', 
            padding: '10px',
            
            }}>
            <p>Copyright © 2022 21C developers. All rights reserved.</p>
        </div>
    )
}
export default Footer