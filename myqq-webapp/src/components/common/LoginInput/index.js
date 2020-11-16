import React, { useState, useEffect } from "react";
import close from "./assets/close.png";
import { InputStyle } from './style'
import Icon from '../../context/Icon'
/**
 *
 * @param {xlinkHref placeHolder type} props
 * xlinkHref:指定图标icon placeHolder指定占位string type string指定占位
 * type指定类型"password/text"
 * handleInput:父组件回调函数,处理输入
 * value:父组件指定值
 */
function SelfInput(props) {
    // 默认属性
    const { xlinkHref, placeHolder, type, maxLength } = props;
    // hanleInput 和 value分别处理值的更新
    const { handleInput, value } = props;
    const [isInput, setIsInput] = useState(false);
    useEffect(() => {
        if (value !== "") {
            setIsInput(true);
        } else {
            setIsInput(false);
        }
    }, [value]);
    return (
        <InputStyle>
            <div className="input-container">
                <div className="img-box">
                    <Icon xlinkHref={xlinkHref} size='1.7rem' />
                </div>
                <div className="input-area">
                    <input
                        className="input-ref"
                        type={type ? type : "text"}
                        placeholder={placeHolder}
                        value={value ? value : ""}
                        onChange={(e) => {
                            // 调用父组件方法
                            if (handleInput) handleInput(e.target.value);
                            else return;
                        }}
                        maxLength={maxLength || 16}
                    />
                </div>
                <div className="canClear">
                    <img
                        style={{
                            opacity: isInput ? 1 : 0,
                            transition: "0.5s opacity"
                        }}
                        src={close}
                        alt="清空"
                        onClick={() => {
                            // 清空
                            handleInput("");
                        }}
                    />
                </div>
            </div>
        </InputStyle>

    );
}

export default React.memo(SelfInput);
