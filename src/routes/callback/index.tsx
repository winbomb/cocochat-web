import { DOMAttributes, ReactNode } from "react";
import { useParams } from "react-router-dom";

import PaymentSuccess from "./PaymentSuccess";

const StyledWrapper = ({ children }: DOMAttributes<HTMLDivElement> & { children?: ReactNode }) => {
  return (
    <div className="flex-center dark:bg-gray-700 dark:text-white w-screen h-screen break-words leading-normal">
      {children}
    </div>
  );
};

// 该页面服务于一些第三方服务的回调，比如 stripe 付款成功的回调
export default function CallbackPage() {
  const { type = "", payload = "" } = useParams();
  // stripe 付款成功
  if (type == "payment_success") {
    return (
      <StyledWrapper>
        <PaymentSuccess sid={payload} />
      </StyledWrapper>
    );
  }
  return <StyledWrapper>callback page</StyledWrapper>;
}
