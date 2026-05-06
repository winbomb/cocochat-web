import { FC } from "react";
import Spinner from "@/components/Spinner";

type Props = {};
const LoadMore: FC<Props> = () => {
  return (
    <div data-load-more className="mt-2 flex-center w-full py-2">
      <Spinner type="waveform" size={18} lineWeight={4} speed={1} color="#ccc" />
    </div>
  );
};
export default LoadMore;
// export default memo(LoadMore, (prev, next) => {
//   return prev.pulling === next.pulling;
// });
