import { faFacebook, faInstagram, faTiktok, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

type SocialLink = {
    platform: string
    url: string
    icon: IconProp
}

type NavigationTab = {
    label: string
    href: string
    roles?: IRole[]
}

export const NAVIGATION_TABS: NavigationTab[] = [
    { label: 'trang chủ', href: '/' },
    { label: 'giới thiệu', href: '/about-us' },
    { label: 'dịch vụ', href: '/our-services' },
    { label: 'mua vé', href: '/buy-tickets' },
    { label: 'quản lý', href: '/dashboard', roles: ['admin'] }
]

export const SOCIAL_LINKS: SocialLink[] = [
    { platform: 'facebook', url: 'https://www.facebook.com', icon: faFacebook },
    { platform: 'youtube', url: 'https://youtube.com', icon: faYoutube },
    { platform: 'tiktok', url: 'https://www.tiktok.com', icon: faTiktok },
    { platform: 'instagram', url: 'https://www.instagram.com', icon: faInstagram },
    { platform: 'x', url: 'https://x.com', icon: faTwitter }
]

export const LOGIN_SESSION_EXPIRED_MESSAGE = 'Phiên đăng nhập hết hạn. Xin vui lòng đăng nhập lại.'
