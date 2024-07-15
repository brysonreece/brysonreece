import { HTMLAttributes } from "react";

import { GitHubIcon, TwitterIcon } from "@/components/ui/icons";

import { Container } from "./ui/container";

const links = [
    { href: "https://twitter.com/brysonio", icon: TwitterIcon, label: "Twitter" },
    { href: "https://github.com/brysonreece", icon: GitHubIcon, label: "GitHub" },
]

export function Footer(props: WithoutChildren<HTMLAttributes<HTMLElement>>) {
    return (
        <footer {...props}>
            <Container className="flex items-center justify-center space-x-6 py-10">
                {links.map(({ href, icon: Icon, label }) => (
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="group">
                        <span className="sr-only">{label}</span>
                        <Icon className="group-hover:fill-stone-700" />
                    </a>
                ))}
            </Container>
        </footer>
    )
}
