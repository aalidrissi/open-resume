import { BaseForm } from "components/ResumeForm/Form";
import { InputGroupWrapper } from "components/ResumeForm/Form/InputGroup";
import { DXC_MODES, DXC_PURPLE, DXC_GREEN } from "components/ResumeForm/ThemeForm/constants";
import { InlineInput } from "components/ResumeForm/ThemeForm/InlineInput";
import {
  DocumentSizeSelections,
  FontFamilySelectionsCSR,
  FontSizeSelections,
} from "components/ResumeForm/ThemeForm/Selection";
import {
  changeSettings,
  changeDXCMode,
  DEFAULT_THEME_COLOR,
  selectSettings,
  selectDXCMode,
  type GeneralSetting,
} from "lib/redux/settingsSlice";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import type { FontFamily } from "components/fonts/constants";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

export const ThemeForm = () => {
  const settings = useAppSelector(selectSettings);
  const dxcMode = useAppSelector(selectDXCMode);
  const { fontSize, fontFamily, documentSize } = settings;
  const themeColor = settings.themeColor || DEFAULT_THEME_COLOR;
  const dispatch = useAppDispatch();

  const handleSettingsChange = (field: GeneralSetting, value: string) => {
    dispatch(changeSettings({ field, value }));
  };

  const handleDXCModeChange = (mode: 'standard' | 'cdg') => {
    dispatch(changeDXCMode(mode));
  };
  return (
    <BaseForm>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Cog6ToothIcon className="h-6 w-6 text-gray-600" aria-hidden="true" />
          <h1 className="text-lg font-semibold tracking-wide text-gray-900 ">
            Resume Setting
          </h1>
        </div>
        <div>
          <InputGroupWrapper label="DXC Mode" />
          <div className="mt-2 flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="dxcMode"
                value="standard"
                checked={dxcMode === 'standard'}
                onChange={() => handleDXCModeChange('standard')}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">
                DXC Standard (Purple)
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="dxcMode"
                value="cdg"
                checked={dxcMode === 'cdg'}
                onChange={() => handleDXCModeChange('cdg')}
                className="h-4 w-4 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm font-medium text-gray-700">
                DXC CDG (Green)
              </span>
            </label>
          </div>
        </div>
        <div>
          <InputGroupWrapper label="Current Theme Color" />
          <div className="mt-2 flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-md text-sm text-white"
              style={{ backgroundColor: themeColor }}
            >
              ✓
            </div>
            <span className="text-sm text-gray-600">
              Color is automatically set based on DXC mode selection
            </span>
          </div>
        </div>
        <div>
          <InputGroupWrapper label="Font Family" />
          <FontFamilySelectionsCSR
            selectedFontFamily={fontFamily}
            themeColor={themeColor}
            handleSettingsChange={handleSettingsChange}
          />
        </div>
        <div>
          <InlineInput
            label="Font Size (pt)"
            name="fontSize"
            value={fontSize}
            placeholder="11"
            onChange={handleSettingsChange}
          />
          <FontSizeSelections
            fontFamily={fontFamily as FontFamily}
            themeColor={themeColor}
            selectedFontSize={fontSize}
            handleSettingsChange={handleSettingsChange}
          />
        </div>
        <div>
          <InputGroupWrapper label="Document Size" />
          <DocumentSizeSelections
            themeColor={themeColor}
            selectedDocumentSize={documentSize}
            handleSettingsChange={handleSettingsChange}
          />
        </div>
      </div>
    </BaseForm>
  );
};
