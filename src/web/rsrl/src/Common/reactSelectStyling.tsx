import { Styles } from "react-select";
import * as styles from "../Common/styles/Variables.scss";
import { styleFn } from "react-select/src/styles";

const bgColor = styles["uiElementBasicBgColor"];
const inputColor = styles["uiElementInputColor"];
const activeColor = styles["uiElementActiveBgColor"];
const borderRadius = styles["uiElementBorderRadius"];
const bgStyle: styleFn = (p: any, s: any) => ({
  ...p,
  backgroundColor: bgColor,
  border: "0 !important",
  boxShadow: "0 !important",
  "&:hover": {
    border: "0 !important"
  }
});
const inputStyle: styleFn = (p: any, s: any) => ({
  ...p,
  backgroundColor: inputColor,
  color: "white"
});
const dataStyle: styleFn = (p: any, s: any) => ({ ...p, backgroundColor: bgColor, color: "white" });
const multiRemoveStyle: styleFn = (p: any, s: any) => ({
  ...p,
  backgroundColor: bgColor,
  color: "white",
  "&:hover": { backgroundColor: activeColor, color: "gray" }
});
const optionStyle: styleFn = (p: any, s: any) => ({
  ...p,
  backgroundColor: inputColor,
  "&:hover": { backgroundColor: activeColor }
});
const placeholderStyle: styleFn = (p: any, s: any) => ({
  ...p,
  backgroundColor: inputColor,
  color: "#6c757d"
});
const dropdownIndicatorStyle: styleFn = (p: any, s: any) => ({
  ...p,
  backgroundColor: inputColor,
  borderTopRightRadius: borderRadius,
  borderBottomRightRadius: borderRadius
});

const valueContainerStyle: styleFn = (p: any, s: any) => ({
  ...p,
  backgroundColor: inputColor,
  borderTopLeftRadius: borderRadius,
  borderBottomLeftRadius: borderRadius
});

const reactSelectDarkStyle: Partial<Styles> = {
  control: bgStyle,
  option: optionStyle,
  menuList: inputStyle,
  dropdownIndicator: dropdownIndicatorStyle,
  input: inputStyle,
  valueContainer: valueContainerStyle,
  clearIndicator: inputStyle,
  group: bgStyle,
  groupHeading: bgStyle,
  indicatorsContainer: bgStyle,
  indicatorSeparator: bgStyle,
  menu: bgStyle,
  menuPortal: bgStyle,
  multiValue: dataStyle,
  multiValueLabel: dataStyle,
  multiValueRemove: multiRemoveStyle,
  noOptionsMessage: inputStyle,
  placeholder: placeholderStyle,
  singleValue: inputStyle
};

export default reactSelectDarkStyle;
