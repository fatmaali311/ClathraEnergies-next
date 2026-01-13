import Header from './Header'
import Footer from './Footer'
import { processImageUrls } from '../../utils/imageUtils'

export default function MainLayout({ children, config, page, dict }) {
  const cfg = config?.configObj || {}

  return (
    <>
      <Header config={cfg} images={config?.images} dict={dict} />
      <main>{children}</main>
      <Footer config={config} images={config?.images} dict={dict} />
    </>
  )
}