import React, { useContext } from "react"
import ReactSelect, { OptionsType, GroupedOptionsType } from "react-select"
import MyThemeContext from "../../themeContext"
import { SelectComponents } from "react-select/src/components"
import Box from "./Box"
import Label from "./Label"

interface SelectProps {
  options:
    | OptionsType<{
        label: string
        value: string
      }>
    | GroupedOptionsType<{
        label: string
        value: string
      }>
  width?: string
  label: string
  required?: boolean
  setValue: (value: any) => void
  autoFocus?: boolean
  components?: Partial<
    SelectComponents<{
      label: string
      value: string
    }>
  >
  clearable?: boolean
  initialValue?: string
}

const Select: React.FC<SelectProps> = ({
  options,
  components,
  setValue,
  clearable,
  autoFocus,
  label,
  required,
  initialValue,
  width = "300px",
}) => {
  const {
    colorMode,
    darkerBgColor,
    themeColorHex,
    themeColorHexLighter,
  } = useContext(MyThemeContext)

  const handleChange = (selectedOption: any) => {
    setValue(selectedOption?.value)
  }

  return (
    <Box w={width}>
      {label && <Label required={required}>{label}</Label>}
      <ReactSelect
        className="basic-single"
        classNamePrefix="select"
        onChange={handleChange}
        placeholder={null}
        isSearchable
        isClearable={clearable}
        options={options}
        components={{
          IndicatorSeparator: () => null,
          ...components,
        }}
        theme={theme => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary25: `${themeColorHexLighter}`,
            primary: `${themeColorHex}`,
            neutral0: darkerBgColor,
          },
        })}
        autoFocus={autoFocus}
        styles={{
          singleValue: base => ({
            ...base,
            padding: 5,
            borderRadius: 5,
            color: colorMode === "light" ? "black" : "white",
            display: "flex",
          }),
          input: base => ({
            ...base,
            color: colorMode === "light" ? "black" : "white",
          }),
        }}
      />
    </Box>
  )
}

export default Select
