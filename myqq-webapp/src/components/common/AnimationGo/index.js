import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Switch, Route, withRouter } from "react-router-dom";
import "./index.css";

/**
 *
 * @param {way} props
 * @description 用于页面路由跳转 通过way指定跳转方式，指定way=refade
 * 则反向
 *
 */
const ANIMATION_MAP = {
  PUSH: "fade",
  POP: "refade",
};
function AnimationGo(props) {
  const { children } = props;
  return (
    <Route
      render={({ location }) => (
        <TransitionGroup
          childFactory={(child) =>
            React.cloneElement(child, {
              classNames: ANIMATION_MAP[props.history.action],
            })
          }
        >
          <CSSTransition timeout={500} key={/**限制二级路由的动画 */location.pathname.substring(0, location.pathname.lastIndexOf('/'))}>
            <Switch location={location}>{children}</Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    ></Route>
  );
}

export default withRouter(React.memo(AnimationGo));
