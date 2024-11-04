import { useModalStore } from "@/stores/modal.stores";


const useModalExtraData = <T>() => {
  const {
    setExtraData,
    extraData
  } : {
    setExtraData: (data : T) => void;
    extraData : T;
  }= useModalStore();

  const setExtraDataHandler = (data: T) => {
    setExtraData(data);
  };

  return {
    extraData,
    setExtraData: setExtraDataHandler
  };
}

export default useModalExtraData;