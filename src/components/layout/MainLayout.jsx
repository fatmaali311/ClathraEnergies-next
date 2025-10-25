import Navbar from '../Navbar'
import Footer from '../Footer'
import { processImageUrls } from '../../utils/imageUtils'

export default function MainLayout({ children, config, page }) {
  const cfg = config?.configObj || {}

  return (
    <>
      <Navbar config={cfg} images={config?.images} />
      <main>{children}</main>
      <Footer config={config} images={config?.images} />
    </>
  )
}