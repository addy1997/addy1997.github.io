import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import type { Profile } from '../data/profile';

const styles = StyleSheet.create({
  page: {
    paddingTop: 56,
    paddingBottom: 56,
    paddingHorizontal: 56,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 32,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    borderBottomStyle: 'solid',
  },
  name: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: '#111111',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  title: {
    fontSize: 11,
    color: '#2563EB',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  bio: {
    fontSize: 10,
    color: '#6B7280',
    lineHeight: 1.7,
    maxWidth: '80%',
  },
  sectionLabel: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#111111',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 8,
    marginTop: 24,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.6,
  },
  footerNote: {
    position: 'absolute',
    bottom: 32,
    left: 56,
    right: 56,
    fontSize: 8,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

interface ResumePDFProps {
  data: Profile;
}

export function ResumePDF({ data }: ResumePDFProps) {
  return (
    <Document
      title={`${data.name} — Resume`}
      author={data.name}
      subject="Resume"
      creator="Portfolio — Live Resume Generator"
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.bio}>{data.bio}</Text>
        </View>

        {/* About section placeholder — populated when profile.about is added */}
        <Text style={styles.sectionLabel}>About</Text>
        <View style={styles.divider} />
        <Text style={styles.bodyText}>
          {data.bio}
        </Text>

        {/* Footer */}
        <Text style={styles.footerNote}>
          Generated on {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </Text>
      </Page>
    </Document>
  );
}
