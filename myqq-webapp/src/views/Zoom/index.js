import React, { useRef } from 'react'
import Nav from '../../components/common/Nav'
import ZoomMessage from '../../components/context/ZoomMessage'
import Scroll from '../../components/common/Scroll'
import styled from 'styled-components'
import Icon from '../../components/context/Icon'
const ZoomStyle = styled.div`
    .wrapper{
      position:absolute;
      left:0;
      right:0;
      bottom:3rem;
      top:3.5rem;
      background-color:#fff;
    }
`

const Zoom = (props) => {
    const mockData = [
        {
            id: 1,
            avator: 'https://xgpax.top/wp-content/uploads/2020/08/head.png',
            nickName: 'ax',
            date: new Date().toLocaleTimeString(),
            content: {
                text: "突然想起你，看了看自己突然想起你，看了看自己突然想起你，看了看自己突然想起你，看了看自己突然想起你，看了看自己突然想起你，看了看自己突然想起你，看了看自己",
                imgSrc: ['https://xgpax.top/wp-content/uploads/2020/12/wp_editor_md_10df0de154bd5b6dded717f1beafbb1a.jpg']
            }
        },
        {
            id: 2,
            avator: 'https://xgpax.top/wp-content/uploads/2020/08/head.png',
            nickName: 'ax',
            date: new Date().toLocaleTimeString(),
            content: {
                text: "突然想起你，看了看自己",
                imgSrc: ['https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg',
                    'https://xgpax.top/wp-content/uploads/2020/12/wp_editor_md_10df0de154bd5b6dded717f1beafbb1a.jpg',
                    'https://xgpax.top/wp-content/uploads/2020/12/wp_editor_md_10df0de154bd5b6dded717f1beafbb1a.jpg']
            }
        },
        {
            id: 3,
            avator: 'https://xgpax.top/wp-content/uploads/2020/08/head.png',
            nickName: 'ax',
            date: new Date().toLocaleTimeString(),
            content: {
                text: "突然想起你，看了看自己",
                imgSrc: ['https://xgpax.top/wp-content/uploads/2020/12/wp_editor_md_10df0de154bd5b6dded717f1beafbb1a.jpg']
            }
        },
        {
            id: 4,
            avator: 'https://xgpax.top/wp-content/uploads/2020/08/head.png',
            nickName: 'ax',
            date: new Date().toLocaleTimeString(),
            content: {
                text: "突然想起你，看了看自己",
                imgSrc: ['https://xgpax.top/wp-content/uploads/2020/12/wp_editor_md_10df0de154bd5b6dded717f1beafbb1a.jpg']
            }
        },
        {
            id: 5,
            avator: 'https://xgpax.top/wp-content/uploads/2020/08/head.png',
            nickName: 'ax',
            date: new Date().toLocaleTimeString(),
            content: {
                text: "突然想起你，看了看自己",
                imgSrc: ['https://xgpax.top/wp-content/uploads/2020/12/wp_editor_md_10df0de154bd5b6dded717f1beafbb1a.jpg']
            }
        }
    ]
    // scroll
    const scroll = useRef(null)
    return (
        <ZoomStyle>
            {/**nav状态 */}
            <Nav>
                <span></span>
                <span>Zoom</span>
                <span>
                    <span style={{position:"relative",left:'-1rem'}}>
                        <Icon
                            xlinkHref={"#icon-add"}
                            size={'1.8rem'}
                        />
                    </span>
                </span>
            </Nav>
            {/**显示动态 */}
            <div className="wrapper">
                <Scroll ref={scroll}>
                    <div>
                        {
                            mockData.map(item => (<ZoomMessage
                                avator={item.avator}
                                nickName={item.nickName}
                                date={item.date}
                                content={item.content}
                                key={item.id}
                            />))
                        }
                    </div>
                </Scroll>
            </div>
        </ZoomStyle>
    )
}
export default Zoom;
