/*
 * Test if any route has unintended horizontal overflow at most common screens
 */
const WIDTHS = [320, 393, 640, 768, 1024];

type Offender = { tag: string; cls: string; left: number; right: number };

/** Elements sticking out horizontally at the current viewport width. */
function findOverflowingElements(win: Window): Offender[] {
    const doc = win.document;
    const vw = doc.documentElement.clientWidth;
    const offenders: Offender[] = [];

    for (const el of Array.from(doc.querySelectorAll<HTMLElement>("body *"))) {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) continue;
        if (rect.right <= vw + 1 && rect.left >= -1) continue;

        // Fixed overlays (parallax space, the clown's cage) clip themselves.
        if (win.getComputedStyle(el).position === "fixed") continue;

        // Skip elements an ancestor already clips or scrolls horizontally
        let ancestor = el.parentElement;
        let clipped = false;
        while (ancestor && ancestor !== doc.body) {
            if (/(hidden|clip|auto|scroll)/.test(win.getComputedStyle(ancestor).overflowX)) {
                clipped = true;
                break;
            }
            ancestor = ancestor.parentElement;
        }
        if (clipped) continue;

        const cls = typeof el.className === "string" ? el.className : "";
        offenders.push({
            tag: el.tagName.toLowerCase(),
            cls: cls.slice(0, 100),
            left: Math.round(rect.left),
            right: Math.round(rect.right),
        });
    }
    return offenders;
}

function assertNoHorizontalOverflow(route: string) {
    for (const width of WIDTHS) {
        cy.viewport(width, 850);
        // let the resize propagate and media queries re-evaluate
        cy.wait(100);
        cy.window().then((win) => {
            const offenders = findOverflowingElements(win);
            expect(
                offenders,
                `${route} @ ${width}px  elements past the viewport edge:\n` +
                    JSON.stringify(offenders, null, 2),
            ).to.have.length(0);
            expect(
                win.document.documentElement.scrollWidth,
                `${route} @ ${width}px  page scroll width`,
            ).to.be.at.most(width + 1);
        });
    }
}

describe("Responsive layout", () => {
    it("home has no horizontal overflow at any width", () => {
        cy.visit("/");
        cy.contains("h1", "Unitystation!").should("be.visible");
        assertNoHorizontalOverflow("/");
    });

    it("download has no horizontal overflow at any width", () => {
        cy.visit("/download");
        cy.contains("h1", "Download Pudu Launcher").should("be.visible");
        assertNoHorizontalOverflow("/download");
    });

    it("blog has no horizontal overflow at any width", () => {
        cy.intercept("GET", /changelog\.unitystation\.org\/posts\/\?page=1$/, {
            fixture: "blogPosts-page1.json",
        }).as("postsPage1");
        cy.intercept("GET", /changelog\.unitystation\.org\/posts\/\?page=2$/, {
            fixture: "blogPosts-page2.json",
        }).as("postsPage2");

        cy.visit("/blog");
        cy.wait("@postsPage1");
        cy.contains("h2", "Station reactor now explodes properly").should("be.visible");
        // materialise the infinite-scroll page before scanning
        cy.scrollTo("bottom");
        cy.wait("@postsPage2");
        assertNoHorizontalOverflow("/blog");
    });

    it("changelog has no horizontal overflow at any width", () => {
        cy.intercept("GET", /changelog\.unitystation\.org\/all-changes/, {
            fixture: "changelog-page1.json",
        }).as("changelog");

        cy.visit("/changelog");
        cy.wait("@changelog");
        assertNoHorizontalOverflow("/changelog");
    });

    it("ledger has no horizontal overflow at any width", () => {
        cy.intercept("GET", /ledger\.unitystation\.org\/movements\/$/, {
            fixture: "ledger-page1.json",
        }).as("ledgerPage1");

        cy.visit("/ledger");
        cy.wait("@ledgerPage1");
        assertNoHorizontalOverflow("/ledger");
    });

    for (const route of ["/login", "/register", "/reset-password"]) {
        it(`${route} has no horizontal overflow at any width`, () => {
            cy.visit(route);
            cy.get("h1").should("be.visible");
            assertNoHorizontalOverflow(route);
        });
    }
});

export {};
