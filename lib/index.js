import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import pt from 'prop-types';

export default config => ReactComponent => {

  class EasyFormHOC extends PureComponent {
    static propTypes = {

    };

    render() {
      return (
        <ReactComponent {...this.props} />
      );
    }

  }

  const mapStateToProps = state => ({});

  const mapDispatchToProps = {};

  return connect(mapStateToProps, mapDispatchToProps)(EasyFormHOC);

}