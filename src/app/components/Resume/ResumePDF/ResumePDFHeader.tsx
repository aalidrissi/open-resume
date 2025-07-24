import { View, Image } from "@react-pdf/renderer";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import { ResumePDFText } from "components/Resume/ResumePDF/common";
import type { ResumeProfile } from "lib/redux/types";

export const ResumePDFHeader = ({
  dxcMode,
  themeColor,
  showProfileInfo = true,
  profile,
  isPDF,
}: {
  dxcMode: 'standard' | 'cdg';
  themeColor: string;
  showProfileInfo?: boolean;
  profile?: ResumeProfile;
  isPDF: boolean;
}) => {
  const logoSrc = dxcMode === 'standard' ? '/assets/dxc-logo.svg' : '/assets/dxc-cdg-logo.svg';
  
  return (
    <View style={{
      ...styles.flexRow,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: spacing["3"],
      borderBottom: `2pt solid ${themeColor}`,
      marginBottom: spacing["4"]
    }}>
      {/* Logo */}
      <View style={{ width: '120pt', height: '40pt' }}>
        {isPDF ? (
          <Image src={logoSrc} style={{ width: '100%', height: '100%' }} />
        ) : (
          <img src={logoSrc} style={{ width: '100%', height: '100%' }} alt="DXC Logo" />
        )}
      </View>
      
      {/* Profile info - only show on first page */}
      {showProfileInfo && profile && (
        <View style={{ flex: 1, marginLeft: spacing["4"] }}>
          <ResumePDFText
            bold={true}
            themeColor={themeColor}
            style={{ fontSize: "18pt", textAlign: 'right' }}
          >
            {profile.name}
          </ResumePDFText>
          {profile.email && (
            <ResumePDFText style={{ textAlign: 'right', marginTop: spacing["0.5"] }}>
              {profile.email}
            </ResumePDFText>
          )}
          {profile.phone && (
            <ResumePDFText style={{ textAlign: 'right', marginTop: spacing["0.5"] }}>
              {profile.phone}
            </ResumePDFText>
          )}
        </View>
      )}
    </View>
  );
};