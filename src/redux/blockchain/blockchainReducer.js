const initialState = {
  loading: false,
  account: null,
  CGBSmartContract: null,
  ZFSmartContract: null,
  GorLocSmartContract: null,
  CroStkSmartContract:null,
  CMBSmartContract: null,
  CPTSmartContract: null,
  OGSmartContract: null,
  CroLocSmartContract: null,
  CroTokenSmartContract: null,
  // new staking
  CroStkSmartContractNew:null,
  CroLocSmartContractNew: null,
  CroTokenSmartContractNew: null,
  web3: null,
  errorMsg: "",
};

const blockchainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONNECTION_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "CONNECTION_SUCCESS":
      return {
        ...state,
        loading: false,
        account: action.payload.account,
        CGBSmartContract: action.payload.CGBSmartContract,
        ZFSmartContract: action.payload.ZFSmartContract,
        GorLocSmartContract: action.payload.GorLocSmartContract,
        CroStkSmartContract: action.payload.CroStkSmartContract,
        CMBSmartContract: action.payload.CMBSmartContract,
        CPTSmartContract: action.payload.CPTSmartContract,
        OGSmartContract: action.payload.OGSmartContract,
        CroLocSmartContract: action.payload.CroLocSmartContract,
        CroTokenSmartContract: action.payload.CroTokenSmartContract,
        // new staking
        CroStkSmartContractNew: action.payload.CroStkSmartContractNew,
        CroLocSmartContractNew: action.payload.CroLocSmartContractNew,
        CroTokenSmartContractNew: action.payload.CroTokenSmartContractNew,
        web3: action.payload.web3,
      };
    case "CONNECTION_FAILED":
      return {
        ...initialState,
        loading: false,
        errorMsg: action.payload,
      };
    case "UPDATE_ACCOUNT":
      return {
        ...state,
        account: action.payload.account,
      };
    default:
      return state;
  }
};

export default blockchainReducer;
