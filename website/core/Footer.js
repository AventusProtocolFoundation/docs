/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react')

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl
    const docsUrl = this.props.config.docsUrl
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`
    const langPart = `${language ? `${language}/` : ''}`
    return `${baseUrl}${docsPart}${langPart}${doc}`
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl
    return baseUrl + (language ? `${language}/` : '') + doc
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Company</h5>
            <a href="https://aventus.io/" target="_blank" rel="noreferrer noopener">
              Aventus
            </a>
            <a href="https://aventus.io/privacy-policy/">Privacy Policy</a>
            <a href="https://aventus.io/tc/">T&C</a>
            <a href="https://blog.aventus.io/" target="_blank" rel="noreferrer noopener">
              Blog
            </a>
          </div>
          <div>
            <h5>More</h5>
            <a
              href="https://github.com/AventusProtocolFoundation"
              target="_blank"
              rel="noreferrer noopener"
            >
              GitHub
            </a>
            <a
              href="https://www.facebook.com/AventusNetwork/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Facebook
            </a>
            <a href="https://twitter.com/AventusNetwork" target="_blank" rel="noreferrer noopener">
              Twitter
            </a>
            <a
              href="https://www.linkedin.com/company/aventusnetwork/"
              target="_blank"
              rel="noreferrer noopener"
            >
              LinkedIn
            </a>
          </div>
        </section>

        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    )
  }
}

module.exports = Footer
